interface DropdownOptionsListProps {
  options: string[];
  value: string;
  onSelect: (val: string) => void;
}

const DropdownOptionsList = ({ options, value, onSelect }: DropdownOptionsListProps) => {
  return (
    <ul className="flex flex-col gap-3 px-4 py-3">
      {options.map(option => (
        <li
          key={option}
          className={`text-lab1-sb flex w-[343px] cursor-pointer items-center justify-center rounded-[4px] border py-[10px] ${
            value === option
              ? "border-mint bg-mint-light text-mint"
              : "border-gray-600 text-gray-800"
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default DropdownOptionsList;