interface ViewingSaveButtonProps {
  onClick: () => void;
}

const ViewingSaveButton = ({ onClick }: ViewingSaveButtonProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 z-100 flex w-full max-w-[430px] -translate-x-1/2 flex-col items-center bg-white px-4 py-3">
      <button
        onClick={onClick}
        className="border-mint-contrast text-heading3 text-mint-contrast hover:bg-mint-light w-full cursor-pointer rounded border p-3"
      >
        저장
      </button>
    </div>
  );
};

export default ViewingSaveButton;
