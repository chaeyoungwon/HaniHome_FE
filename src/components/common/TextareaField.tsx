import { useRef } from "react";

interface TextareaFieldProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const TextareaField = ({
  title,
  placeholder,
  value,
  onChange,
  maxLength = 500,
}: TextareaFieldProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <section className="flex flex-col gap-4 px-4 py-3">
      <p className="text-heading3 text-gray-800">{title}</p>
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        rows={1}
        className="text-body1-med bg-gray-0 w-full resize-none rounded p-3 text-gray-700 outline-none placeholder:text-gray-400"
      />
      <span className="text-cap1-med block text-right text-gray-400">
        {value.length}/{maxLength}
      </span>
    </section>
  );
};

export default TextareaField;
