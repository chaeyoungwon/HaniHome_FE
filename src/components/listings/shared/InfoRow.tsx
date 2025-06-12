import Label from "./Label";
import Section from "./Section";

const InfoRow = ({
  label,
  value,
  textClassName = "text-body1-med",
}: {
  label: string;
  value: string;
  textClassName?: string;
}) => (
  <Section>
    <div className="flex items-center justify-between px-4 py-3">
      <Label>{label}</Label>
      <span className={`${textClassName} text-gray-700`}>{value}</span>
    </div>
  </Section>
);

export default InfoRow;
