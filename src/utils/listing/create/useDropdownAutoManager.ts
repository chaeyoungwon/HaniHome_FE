import { useEffect, useRef, useState } from "react";

interface UseDropdownAutoManagerParams {
  totalCount: number;
  autoCloseDelay?: number; // default 4000ms
  shouldAutoClose?: (index: number) => boolean;
}

/**
 * 드롭다운 자동 열림/닫힘 및 visible 상태 관리
 */
export function useDropdownAutoManager({
  totalCount,
  autoCloseDelay =1500,
  shouldAutoClose,
}: UseDropdownAutoManagerParams) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // 첫 번째 드롭다운 열려 있음
  const [visibleIndices, setVisibleIndices] = useState<number[]>([0]); // 첫 번째 드롭다운 visible
  const [manualOpenedIndices, setManualOpenedIndices] = useState<Set<number>>(
    new Set(),
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLastIndex = (index: number) => index === totalCount - 1;

  const defaultShouldAutoClose = (index: number) => !isLastIndex(index);

  const finalShouldAutoClose = (index: number) => {
    if (isLastIndex(index)) return false;
    return shouldAutoClose
      ? shouldAutoClose(index)
      : defaultShouldAutoClose(index);
  };

  const toggleIndex = (idx: number) => {
    setOpenIndices(prev => {
      if (prev.includes(idx)) {
        setManualOpenedIndices(prevManual => {
          const updated = new Set(prevManual);
          updated.delete(idx);
          return updated;
        });
        return prev.filter(i => i !== idx); // 드롭다운 닫음
      } else {
        setManualOpenedIndices(prevManual => new Set(prevManual).add(idx));
        setVisibleIndices(prev => [...new Set([...prev, idx])]); // 수동으로 열 때 visible 추가
        return [...new Set([...prev, idx])]; // 다른 드롭다운 유지
      }
    });
  };

  const autoAdvance = (currentIndex: number) => {
    if (
      !finalShouldAutoClose(currentIndex) ||
      manualOpenedIndices.has(currentIndex)
    ) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setOpenIndices(prev => {
        const nextIndex = currentIndex + 1;
        const filtered = prev.filter(i => i !== currentIndex); // 현재 드롭다운 닫음
        if (nextIndex < totalCount && !filtered.includes(nextIndex)) {
          filtered.push(nextIndex); // 다음 드롭다운 열음
          setVisibleIndices(prevVisible => [
            ...new Set([...prevVisible, nextIndex]),
          ]); // 누적적으로 visible 추가, 중복 방지
        }
        return filtered;
      });
    }, autoCloseDelay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    openIndices,
    visibleIndices,
    toggleIndex,
    autoAdvance,
    manualOpenedIndices,
  };
}
