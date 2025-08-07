interface DropdownOptionsListProps<T extends string | number> {
  options: { value: T; label: string }[];
  value: T | null;
  onSelect: (val: T) => void;
}

function DropdownOptionsList<T extends string | number>({
  options,
  value,
  onSelect,
}: DropdownOptionsListProps<T>) {
  return (
    <ul className="flex flex-col gap-3 px-4 py-3">
      {options.map(({ value: val, label }) => {
        const isSelected = val === value;
        return (
          <li
            key={String(val)}
            className={`text-lab1-sb flex w-full max-w-[398px] cursor-pointer items-center justify-center rounded-[4px] border py-[10px] ${
              isSelected
                ? "border-mint bg-mint-light text-mint"
                : "border-gray-600 text-gray-800"
            }`}
            onClick={() => onSelect(val)}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
}

export default DropdownOptionsList;
