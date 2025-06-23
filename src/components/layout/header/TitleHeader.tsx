import ListIcon from "@/public/svgs/header/list-icon.svg";

interface TitleHeaderProps {
  title?: string;
  rightIcon?: "list";
  onRightClick?: () => void;
}

const TitleHeader = ({ title, rightIcon, onRightClick }: TitleHeaderProps) => {
  return (
    <header className="sticky top-0 left-1/2 z-50 flex h-12 max-w-[768px] min-w-[375px] items-center justify-between bg-white px-4 py-3">
      {title ? (
        <h1 className="text-heading2 flex-grow text-center text-gray-900">
          {title}
        </h1>
      ) : (
        <div />
      )}

      {rightIcon === "list" ? (
        <button onClick={onRightClick} className="cursor-pointer">
          <ListIcon className="h-6 w-6" />
        </button>
      ) : (
        <div />
      )}
    </header>
  );
};

export default TitleHeader;
