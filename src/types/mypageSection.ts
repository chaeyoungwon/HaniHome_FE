export type SectionItem = {
  label: string;
  onClick: () => void;
  color?: "danger";
};

export type SectionData = {
  label: string;
  items: SectionItem[];
};
