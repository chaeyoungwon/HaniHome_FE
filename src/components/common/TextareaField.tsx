import { useAutosize } from "@/hooks/common/useAutoSize";

interface TextareaFieldProps {
  title?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  gap?: string; // gap prop 추가
}

const TextareaField = ({
  title,
  placeholder,
  value,
  onChange,
  maxLength = 500,
  gap = "gap-4", // 기본값은 gap-4
}: TextareaFieldProps) => {
  const { textareaRef, mirrorRef } = useAutosize(value, 400);

  return (
    <section className={`flex flex-col ${gap} px-4 py-3`}>
      {title && <p className="text-heading3 text-gray-800">{title}</p>}
      {/* title이 있을 때만 표시 */}
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          maxLength={maxLength}
          className="text-body1-med scrollbar-hide bg-gray-0 w-full resize-none rounded p-3 text-gray-700 outline-none placeholder:text-gray-400"
        />
        <div
          ref={mirrorRef}
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -9999,
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            boxSizing: "border-box",
            fontSize: "14px",
            lineHeight: "20px",
            fontFamily: "inherit",
            padding: "12px",
            visibility: "hidden",
          }}
        />
      </div>
      <span className="text-cap1-med block text-right text-gray-400">
        {value.length}/{maxLength}
      </span>
    </section>
  );
};

export default TextareaField;
