interface TitleSectionProps {
  title: string;
  label: string;
}

const TitleSection = ({ title, label }: TitleSectionProps) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <div className="text-heading2 text-gray-900">{title}</div>
      <div className="text-cap1-med text-gray-700">{label}</div>
    </div>
  );
};
export default TitleSection;
