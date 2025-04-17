import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface TooltipIcon {
  message: string;
}

export const TooltipIcon = ({ message }: TooltipIcon) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <FontAwesomeIcon icon={["fas", "circle-info"]} />
      {show && (
        <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10 w-44">
          {message}
        </div>
      )}
    </div>
  );
};
