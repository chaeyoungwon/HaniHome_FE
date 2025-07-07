interface TabItem {
  key: string;
  label: string;
}

interface SelectTabProps {
  tabs: readonly TabItem[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const SelectTab = ({ tabs, activeTab, onChange }: SelectTabProps) => {
  const padding = tabs.length === 2 ? "py-2" : "px-4 pt-3 pb-2";

  return (
    <div className={`flex ${padding}`}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`text-body1-sb flex-1 cursor-pointer border-b p-2.5 text-center ${
            activeTab === tab.key
              ? "font-gray-900 border-gray-700"
              : "border-white text-gray-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SelectTab;
