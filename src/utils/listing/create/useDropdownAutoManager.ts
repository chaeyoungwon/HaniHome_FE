import { useEffect, useRef, useState } from "react";

interface UseDropdownAutoManagerParams {
  totalCount: number;
  autoCloseDelay?: number; // default 4000ms
  shouldAutoClose?: (index: number) => boolean;
}

/**
 * 드롭다운 자동 열림/닫힘 상태 관리 + 타임아웃 + 마지막 질문 자동 닫힘 제외
 */
export function useDropdownAutoManager({
  totalCount,
  autoCloseDelay = 4000,
  shouldAutoClose,
}: UseDropdownAutoManagerParams) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
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
  const timeoutMapRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  
  const toggleIndex = (idx: number) => {
    setOpenIndices(prev => {
      if (prev.includes(idx)) {
        setManualOpenedIndices(prevManual => {
          const updated = new Set(prevManual);
          updated.delete(idx);
          return updated;
        });
        return prev.filter(i => i !== idx);
      } else {
        setManualOpenedIndices(prevManual => new Set(prevManual).add(idx));
        return [...prev, idx];
      }
    });
  };

  const autoAdvance = (currentIndex: number) => {
    const existing = timeoutMapRef.current.get(currentIndex);
    if (existing) clearTimeout(existing);

    if (
      !finalShouldAutoClose(currentIndex) ||
      manualOpenedIndices.has(currentIndex)
    )
      return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setOpenIndices(prev => {
        const filtered = prev.filter(i => i !== currentIndex); // 수동 여부 상관없이 닫음

        const nextIndex = currentIndex + 1;
        if (nextIndex < totalCount && !filtered.includes(nextIndex)) {
          filtered.push(nextIndex);
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
    toggleIndex,
    autoAdvance,
    manualOpenedIndices,
  };
}
