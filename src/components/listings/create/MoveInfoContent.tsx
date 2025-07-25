import { useState, useEffect } from "react";

import AvailableDatePicker from "@/components/home/filter/AvailableDatePicker";

interface MoveInfoContentProps {
  onSelect: (
    value: Record<"availableFrom" | "availableTo", string | null> & {
      immediate: boolean;
      negotiable: boolean;
    },
  ) => void;
}

const MoveInfoContent = ({ onSelect }: MoveInfoContentProps) => {
  const [availableFrom, setAvailableFrom] = useState<string | null>(null);
  const [availableTo, setAvailableTo] = useState<string | null>(null);
  const [immediate, setImmediate] = useState(false);
  const [negotiable, setNegotiable] = useState(false);

  const handleDateChange = (from: string, to: string) => {
    setAvailableFrom(from);
    setAvailableTo(to);
  };

  const toggleImmediate = () => setImmediate(prev => !prev);
  const toggleNegotiable = () => setNegotiable(prev => !prev);

  useEffect(() => {
    onSelect({
      availableFrom,
      availableTo,
      immediate,
      negotiable,
    });
  }, [availableFrom, availableTo, immediate, negotiable]);
  
  return (
    <AvailableDatePicker
      availableFrom={availableFrom}
      availableTo={availableTo}
      immediate={immediate}
      negotiable={negotiable}
      onDateChange={handleDateChange}
      onImmediateToggle={toggleImmediate}
      onNegotiableToggle={toggleNegotiable}
    />
  );
};
export default MoveInfoContent;
