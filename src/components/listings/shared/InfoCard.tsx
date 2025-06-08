import Label from "./Label";

// 정보 카드 컴포넌트 (1/2 너비)
const InfoCard = ({
  title,
  items,
  className = "",
}: {
  title: string;
  items: React.ReactNode[];
  className?: string;
}) => (
  <div className={`flex w-1/2 flex-col px-4 ${className}`}>
    <Label>{title}</Label>
    <div className="flex flex-col gap-2">{items}</div>
  </div>
);

export default InfoCard;
