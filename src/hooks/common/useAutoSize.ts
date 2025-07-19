import { useEffect, useRef } from "react";

export const useAutosize = (value: string, maxHeight: number) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    if (!textarea || !mirror) return;

    mirror.textContent = (value || textarea.placeholder || " ") + "\n";

    const style = window.getComputedStyle(textarea);
    mirror.style.fontSize = style.fontSize;
    mirror.style.fontFamily = style.fontFamily;
    mirror.style.lineHeight = style.lineHeight;
    mirror.style.padding = style.padding;
    mirror.style.border = style.border;
    mirror.style.boxSizing = style.boxSizing;
    mirror.style.letterSpacing = style.letterSpacing;
    mirror.style.wordBreak = style.wordBreak;
    mirror.style.whiteSpace = "pre-wrap";
    mirror.style.overflowWrap = "break-word";
    mirror.style.wordWrap = "break-word";
    mirror.style.width = style.width;

    const mirrorHeight = mirror.scrollHeight;

    if (mirrorHeight <= maxHeight) {
      textarea.style.height = `${mirrorHeight}px`;
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    }
  }, [value, maxHeight]);

  return { textareaRef, mirrorRef };
};
