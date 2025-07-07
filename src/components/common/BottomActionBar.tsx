interface BottomActionBarProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;

  // 버튼 2개 이상인 경우
  buttons?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: "filled" | "outline";
  }[];
  // 버튼 넓이 레이아웃
  layout?: "default" | "equal";

  showDivider?: boolean;
}

const BottomActionBar = ({
  label,
  onClick,
  disabled = false,
  buttons,
  showDivider = true,
  layout = "default",
}: BottomActionBarProps) => {
  const isSingle = !buttons || buttons.length === 0;

  // 단일 버튼 케이스
  if (isSingle) {
    return (
      <div className="fixed bottom-0 left-1/2 z-100 flex w-[375px] -translate-x-1/2 flex-col items-center bg-white">
        {showDivider && (
          <div className="h-[1px] w-full self-center bg-gray-300" />
        )}
        <button
          type="button"
          onClick={onClick}
          className={`text-heading3 my-2 h-12 w-[343px] rounded py-3 text-white transition ${
            disabled
              ? "cursor-not-allowed bg-gray-300"
              : "bg-mint cursor-pointer"
          }`}
        >
          {label}
        </button>
      </div>
    );
  }

  // 버튼 두 개 이상 케이스
  return (
    <div className="fixed bottom-0 left-1/2 z-100 flex w-[375px] -translate-x-1/2 flex-col items-center bg-white">
      {showDivider && <div className="h-[1px] w-full bg-gray-300" />}

      <div
        className={`my-2 flex w-[343px] ${
          layout === "equal" ? "gap-2.5" : "gap-1"
        }`}
      >
        {buttons.map((btn, index) => {
          const isDisabled = btn.disabled ?? false;

          const widthClass =
            layout === "equal" ? "flex-1" : index === 0 ? "w-[83px]" : "flex-1";
          const variantClass =
            btn.variant === "outline"
              ? "border border-mint bg-white text-mint cursor-pointer"
              : isDisabled
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-mint text-white cursor-pointer";

          return (
            <button
              key={index}
              type="button"
              onClick={btn.onClick}
              disabled={isDisabled}
              className={`${widthClass} ${variantClass} text-heading3 h-12 rounded py-3 transition`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomActionBar;
