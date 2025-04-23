import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";

const initialState = {
  loading: false,
  options: [] as any,
};

export const Combo = ({ field, ...props }: any) => {
  const [state, setState] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<any>(null);

  const { options } = state;

  const isCurrentSelection = (option: any) => {
    return selection && selection.value === option[field.value];
  };

  const handleSelection = (option: any) => {
    props.onChange({
      target: { name: field.fieldName, value: option[field.value] },
    });

    setSelection({ value: option[field.value], key: option[field.key] });
    setIsOpen(false);
  };

  const findOption = useCallback(
    (val: any, data: any) => {
      return data.find((opt: any) => {
        return opt[field.value] === val;
      });
    },
    [field],
  );

  const fetchData = useCallback(async () => {
    let data;

    setState((prevState) => ({ ...prevState, loading: true }));

    if (field.completeUrl) {
      const response = await fetch(field.completeUrl);
      const options = await response.json();
      data = options.data;
    } else if (field.endpoint) {
      const response = await fetch(
        `http://cs360-env.eba-uiktmyhc.us-east-1.elasticbeanstalk.com/api/${field.endpoint}`,
      );
      const options = await response.json();
      data = options.data;
    } else {
      data = field.data;
    }

    if (field.value !== "") {
      const defaultOption = findOption(field.value, data);
      if (defaultOption) {
        setSelection({
          value: defaultOption[field.value],
          key: defaultOption[field.key],
        });
      }
    }

    setState({ options: data, loading: true });
  }, [field, findOption]);

  useEffect(() => {
    fetchData();
  }, [field, fetchData]);

  return (
    <div className="flex flex-row items-center w-full gap-2">
      <div id="select-button" className="w-full relative">
        <div
          className={`mt-1 px-4 p-2 flex cursor-pointer justify-between rounded-md shadow-sm items-center bg-white border focus:border-indigo-700 border-gray-300 focus:ring-0 ${field.isDisabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
          onClick={() => {
            if (!field.isDisabled) setIsOpen(!isOpen);
          }}
        >
          <div id="selected-value" className="flex flex-col">
            <p className="text-sm font-medium text-gray-500">
              {selection ? selection.value : "Selecciona una opción..."}
            </p>
          </div>
          <div id="chevrons" className="flex flex-col w-max">
            <FontAwesomeIcon
              className="text-xs text-gray-400"
              icon={["fas", "chevron-down"]}
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute bg-white w-full options mt-2 border border-gray-200 z-20 rounded-md h-auto max-h-60 overflow-y-auto">
            <ul className="text-sm text-main-font">
              {options.length > 0 &&
                options.map((option: any) => (
                  <div
                    key={option.key}
                    className={`${isCurrentSelection(option) && "bg-indigo-50"} flex w-full px-4 py-2 justify-between items-center hover:bg-indigo-50 cursor-pointer`}
                    onClick={() => handleSelection(option)}
                  >
                    <li>{option.value}</li>
                    {isCurrentSelection(option) && (
                      <FontAwesomeIcon
                        className="text-sm text-indigo-700"
                        icon={["fas", "check"]}
                      />
                    )}
                  </div>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
