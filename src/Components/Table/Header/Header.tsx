import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Combo } from "../../Combo/Combo";

export const Header = () => {
  return (
    <div className="py-2 px-2 mb-3 flex items-center justify-between">
      <div className="text-sm flex items-center text-gray-700">
        Resultados encontrados
      </div>
      <div className="">
        <FontAwesomeIcon
          className="text-gray-400 text-sm cursor-pointer"
          icon={["fas", "sync"]}
        />
      </div>
    </div>
  );
};
