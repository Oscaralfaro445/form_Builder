import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputTypeId, GenericField } from "../../Models";
import { Combo } from "../Combo/Combo";
import { Relation } from "../Relation/Relation";
import "./Input.css";

type InputProps = {
  field: any;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  disabled: boolean;
};

export const Input = ({
  field,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}: InputProps) => {
  const [show, setShow] = useState(false);

  const renderInput = () => {
    if (!field) return null;

    const commonProps = {
      name,
      value,
      onChange,
      onBlur,
      disabled,
    };

    switch (field.cveTipoCompon) {
      case InputTypeId.TEXTO:
        return <TextInput field={field} {...commonProps} />;
      case InputTypeId.NUMERO:
        return <NumberInput field={field} {...commonProps} />;
      case InputTypeId.FECHA:
        return <FechaInput field={field} {...commonProps} />;
      case InputTypeId.AREA:
        return <Area field={field} {...commonProps} />;
      case InputTypeId.SWITCH:
        return <Switch field={field} {...commonProps} />;
      case InputTypeId.RELATION:
        return <Relation field={field} {...commonProps} />;
      case InputTypeId.COMBO:
        return <Combo field={field} {...commonProps} />;
      case InputTypeId.SEPARADOR:
        return <SectionDivider />;
      default:
        return null;
    }
  };

  return (
    <div className={`col-span-12 sm:${field.sizeClass} relative`}>
      {field.cveTipoCompon !== InputTypeId.RELATION && (
        <div className="flex items-center">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-600 mr-4"
          >
            {field.txEtiqueta}
          </label>
          {field.txAyuda && (
            <div
              className="flex sm:flex-col"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <FontAwesomeIcon
                className="text-blue-600 absolute bottom-3 right-4"
                icon={["fas", "question-circle"]}
              />
              {show && (
                <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10 w-44">
                  {field.txAyuda}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {renderInput()}
    </div>
  );
};

// Componentes específicos con tipado adecuado
interface FieldInputProps {
  field: GenericField;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  disabled?: boolean;
}

const TextInput = ({
  name,
  value,
  onChange,
  onBlur,
  disabled,
}: FieldInputProps) => (
  <input
    type="text"
    id={name}
    name={name}
    value={value ?? ""}
    onChange={onChange}
    onBlur={onBlur}
    disabled={disabled}
    className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
  />
);

const NumberInput = ({
  name,
  value,
  onChange,
  onBlur,
  disabled,
}: FieldInputProps) => (
  <input
    type="number"
    id={name}
    name={name}
    value={value ?? 0}
    onChange={onChange}
    onBlur={onBlur}
    disabled={disabled}
    className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
  />
);

const FechaInput = ({
  name,
  value,
  onChange,
  onBlur,
  disabled,
}: FieldInputProps) => (
  <input
    type="date"
    id={name}
    name={name}
    value={value ?? ""}
    onChange={onChange}
    onBlur={onBlur}
    disabled={disabled}
    className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
  />
);

const Area = ({ name, value, onChange, onBlur, disabled }: FieldInputProps) => (
  <textarea
    id={name}
    name={name}
    value={value ?? ""}
    onChange={onChange}
    onBlur={onBlur}
    disabled={disabled}
    className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
  />
);

const Switch = ({ name, value, onChange, disabled }: FieldInputProps) => (
  <div className="relative inline-block w-10 mr-2 pt-3 align-middle select-none transition duration-700 ease-in">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={!!value}
      onChange={onChange}
      disabled={disabled}
      className="toggle-checkbox absolute block w-5 h-5 border-gray-300 rounded-full bg-white focus:ring-offset-0 focus:ring-0 hover:bg-white appearance-none cursor-pointer"
    />
    <label
      htmlFor={name}
      className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-200 cursor-pointer"
    />
  </div>
);

const SectionDivider = () => (
  <div className="relative flex items-center w-full my-4">
    <div className="flex-grow border-t border-gray-300 mx-4"></div>
    <span className="text-gray-600 text-sm font-medium px-2">TEXT</span>
    <div className="flex-grow border-t border-gray-300 mx-4"></div>
  </div>
);
