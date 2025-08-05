interface DdayBadgeProps {
  dday: number;
}

const DdayBadge = ({ dday }: DdayBadgeProps) => {
  const displayText = dday === 0 ? "D-DAY" : `D-${dday}`;

  return (
    <div className="bg-violet-ultralight text-cap1-b text-violet-dark mx-4 my-2 rounded px-3 py-[2px]">
      {displayText}
    </div>
  );
};

export default DdayBadge;
