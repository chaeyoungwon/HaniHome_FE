"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMetroStore } from "@/stores/useMetroStore";
import clsx from "clsx";

import { fetchPlaceSuggestions } from "@/apis/googlePlaces";

import useKeyboardNavigation from "@/hooks/common/useKeyboardNavigation";

import { PlacePrediction } from "@/types/googlePlaces";

import SearchIcon from "@/public/svgs/common/search-icon.svg";

interface SearchFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  isSelected?: boolean;
  onSearchClick?: (id: string, text: string) => void;
  onConfirm?: (confirmed: boolean) => void;
  type?: string;
}

const SearchField = ({
  label,
  type,
  value,
  onChange,
  placeholder = "소문자, 영어로 입력해주세요",
  isSelected: isSelectedProp,
  onSearchClick,
  onConfirm,
}: SearchFieldProps) => {
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const isSelectedRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(
    isSelectedProp ?? false,
  );

  useEffect(() => {
    setIsSelected(isSelectedProp ?? false);
    isSelectedRef.current = isSelectedProp ?? false;
    setIsTyping(false);
  }, [isSelectedProp]);

  const { highlightedIndex, setHighlightedIndex, handleKeyDown } =
    useKeyboardNavigation(results.length, index => {
      handleSelect(results[index].placeId, results[index].text);
    });

  const fetchPlaces = useCallback(async () => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      if (type === "subway") {
        const stops = useMetroStore.getState().stops;
        const filtered = stops
          .filter(stop =>
            stop.stopName.toLowerCase().includes(value.trim().toLowerCase()),
          )
          .slice(0, 5)
          .map(stop => ({
            placeId: String(stop.id),
            text: stop.stopName,
          }));

        setResults(filtered);
      } else {
        const suggestions = await fetchPlaceSuggestions(
          value,
          controller.signal,
        );
        setResults(suggestions);
      }
    } catch {
      // silent fail
    }
  }, [value, isTyping, type]);

  useEffect(() => {
    if (!isTyping || !value.trim()) return;

    const debounce = setTimeout(() => {
      fetchPlaces();
    }, 300);

    return () => clearTimeout(debounce);
  }, [value, isTyping]);

  const handleSelect = (id: string, text: string) => {
    setIsTyping(false);
    isSelectedRef.current = true;
    setIsSelected(true);
    onChange(text);
    onConfirm?.(true);
    if (type === "subway" && onSearchClick) {
      onSearchClick(id, text);
    }

    setResults([]);
    setHighlightedIndex(-1);
  };

  const handleClick = () => {
    if (type === "subway") {
      onSearchClick?.("", value);
    } else {
      if (results.length > 0) {
        setResults([]);
      } else {
        fetchPlaces();
      }
      onSearchClick?.("", value);
    }
  };

  return (
    <div
      className={`flex w-full flex-col gap-3 ${
        label ? (type === "subway" ? "py-3" : "py-4") : ""
      }`}
    >
      {label && (
        <label htmlFor="search-input" className="text-body1-sb text-gray-800">
          {label}
        </label>
      )}
      <div className="flex max-w-[343px] flex-col">
        <div className="group relative w-full">
          <input
            id="search-input"
            autoComplete="off"
            className={clsx(
              "text-body1-med h-[44px] w-full rounded-sm border py-3 placeholder:text-gray-500 focus:outline-none",
              isSelected
                ? "border-gray-600 px-4 text-gray-900"
                : "border-gray-400 pr-12 pl-4 focus:border-gray-900",
            )}
            placeholder={placeholder}
            value={value}
            onChange={e => {
              setIsTyping(true);
              isSelectedRef.current = false;
              setIsSelected(false);
              onChange(e.target.value);
              onConfirm?.(false);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <SearchIcon
              className={clsx(
                "absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2",
                value || isSelected ? "text-gray-600" : "text-gray-400",
                "group-focus-within:text-gray-600",
              )}
            />
          </button>
        </div>

        {results.length > 0 && (
          <div className="relative z-10 mt-[-2px] w-full rounded-sm rounded-t-none border border-gray-500 bg-white">
            <ul className="flex flex-col">
              {results.map((r, index) => (
                <li
                  key={r.placeId}
                  onClick={() => handleSelect(r.placeId, r.text)}
                  className={`text-body1-med cursor-pointer truncate px-4 py-2 text-gray-700 ${
                    index === highlightedIndex
                      ? "bg-gray-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {r.text}
                </li>
              ))}
            </ul>

            {type !== "subway" && (
              <div className="px-4 pb-2 text-right text-[6.625px] text-gray-700">
                powered by google
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchField;
