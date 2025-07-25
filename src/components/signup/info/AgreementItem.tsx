import Link from "next/link";

interface AgreementItemProps {
  id: number;
  link?: string;
  label: string;
}

const AgreementItem = ({ id, label, link }: AgreementItemProps) => {
  const isRequired = label.includes("[필수]");

  return (
    <button
      key={id}
      className="flex cursor-pointer items-center gap-1 text-left"
    >
      <div className="flex items-center gap-1">
        <span className="text-cap1-med text-gray-500">{label}</span>
        {isRequired && link && (
          <Link href={link} className="text-cap1-med text-gray-500 underline">
            자세히 보기
          </Link>
        )}
      </div>
    </button>
  );
};

export default AgreementItem;
