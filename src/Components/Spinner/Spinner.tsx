import "./Spinner.css";

export const Spinner = ({ size }: { size: string }) => {
  const getSize = (size: string) => {
    switch (size) {
      case "xs":
        return "w-10 h-10";
      case "sm":
        return "w-15 h-15";
      case "md":
        return "w-20 h-20";
      default:
        break;
    }
  };

  return <div className={`spinner ${getSize(size)}`}></div>;
};
