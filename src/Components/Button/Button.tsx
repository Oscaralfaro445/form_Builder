import { IconName } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  onClick: (e: any) => void;
  theme: string;
  title?: string;
  icon?: string;
  flow?: string;
  loading?: boolean;
}

export const Button = ({
  onClick,
  theme,
  title,
  icon,
  flow = "",
  loading = false,
}: ButtonProps) => {
  const themes: { [key: string]: string } = {
    primary:
      "inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-xs font-medium text-white bg-blue-700 ",
    secondary: "py-2 px-4 rounded-lg bg-indigo-200 text-indigo-700 font-medium",
    normal:
      "inline-flex items-center px-3 py-1 border rounded-md shadow-sm text-xs border-blue-800 font-medium text-blue-800 bg-white",
    pill: "py-1 px-2 rounded-full bg bg-indigo-200 text-indigo-700 text-sm font-medium",
    success:
      "inline-flex text-gray-800 items-center px-3  border-gray-300 mr-2 py-1 border rounded-md shadow-sm text-xs font-medium text-gray-500 bg-gray-50",
    danger:
      "inline-flex items-center px-3 py-1 border rounded-md shadow-sm text-xs font-medium text-white bg-red-700 ",
  };

  return (
    <button
      className={`mr-2 flex gap-2 h-8 justify-between ${themes[theme]} cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`h-5 flex justify-center items-center ${
          flow === "reverse" ? "flex-row-reverse" : ""
        }`}
      >
        {icon && (
          <FontAwesomeIcon
            className="h-5 w-5"
            icon={["fas", icon as IconName]}
          />
        )}
        {title && (
          <span
            className={`${loading ? "ml-4" : ""} ${
              flow !== "reverse" ? "ml-2" : "mr-2"
            }`}
          >
            {title}
          </span>
        )}
      </div>
    </button>
  );
};
