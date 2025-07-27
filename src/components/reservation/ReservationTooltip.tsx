import React from "react";

interface ReservationTooltipProps {
  message: string;
}

const ReservationTooltip = ({ message }: ReservationTooltipProps) => {
  return (
    <div className="absolute -top-16 left-[143px] flex flex-col items-center">
      <div className="text-cap1-med rounded bg-gray-800 p-3 whitespace-nowrap text-gray-300">
        {message}
      </div>
      <div className="h-0 w-0 border-x-[9px] border-t-[15px] border-x-transparent border-t-gray-800" />
    </div>
  );
};

export default ReservationTooltip;
