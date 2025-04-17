import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { AlertState } from "../../Models/Alert/Alert";
import "./Alert.css";

type AlertProps = {
  type: AlertState;
  title: string;
  description: string;
  isOpen: boolean;
  handleExit: () => void;
};

export const Alert = ({
  type,
  title,
  description,
  isOpen,
  handleExit,
}: AlertProps) => {
  useEffect(() => {
    if (isOpen === true) {
      setTimeout(() => {
        handleExit();
      }, 2500);
    }
  }, [isOpen, handleExit]);

  return (
    <div
      className={`absolute p-4 w-96 rounded-lg z-50 top-4 right-0 flex items-start shadow-lg border border-gray-100 bg-white alert ${isOpen ? "active" : ""}`}
    >
      <div className="h-full flex justify-center">
        {type === AlertState.SUCCESS && (
          <FontAwesomeIcon
            className="text-xl text-green-400"
            icon={["fas", "check-circle"]}
          />
        )}
        {type === AlertState.ERROR && (
          <FontAwesomeIcon
            className="text-xl text-red-400"
            icon={["fas", "times-circle"]}
          />
        )}
      </div>
      <div className="px-6 flex-auto flex flex-col">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <div className="h-full flex justify-center">
        <FontAwesomeIcon
          className="text-lg text-gray-300 cursor-pointer"
          icon={["fas", "times"]}
          onClick={handleExit}
        />
      </div>
    </div>
  );
};
