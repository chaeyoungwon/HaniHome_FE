interface DdayBadgeProps {
  dday: number;
}

const DdayBadge = ({ dday }: DdayBadgeProps) => {
  return (
    <div className="bg-violet-ultralight text-cap1-b text-violet-dark mx-4 my-2 rounded px-3 py-[2px]">
      D-{dday}
    </div>
  );
};

export default DdayBadge;
