import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputTypeId, GenericField } from "../../Models";
import { Combo } from "../Combo/Combo"; //
import { Relation } from "../Relation/Relation";
import "./Input.css";

type InputProps = {
  field: any;
};

export const Input = ({ field, ...props }: InputProps) => {
  console.log(field.cveTipoCompon);
  const renderInput = () => {
    if (!field) return null;

    switch (field.cveTipoCompon) {
      case InputTypeId.TEXTO:
        return <TextInput field={field} {...props} />;
      case InputTypeId.NUMERO:
        return <NumberInput field={field} {...props} />;
      case InputTypeId.FECHA:
        return <FechaInput field={field} {...props} />;
      case InputTypeId.AREA:
        return <Area field={field} {...props} />;
      case InputTypeId.SWITCH:
        return <Switch field={field} {...props} />;
      case InputTypeId.RELATION:
        return <Relation field={field} />;
      case InputTypeId.COMBO:
        return <Combo field={field as GenericField} {...props} />;
      case InputTypeId.SEPARADOR:
        return <SectionDivider />;

      default:
        return null;
    }
  };

  return (
    <div className={`col-span-12 sm:${field.sizeClass} relative`}>
      {field.cmpType !== InputTypeId.RELATION && (
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-4">
            {field.label}
          </label>
          {field.helpText ? (
            <FontAwesomeIcon
              className="text-gray-300 absolute bottom-3 right-4"
              icon={["fas", "question-circle"]}
            />
          ) : null}
        </div>
      )}
      {renderInput()}
    </div>
  );
};

const TextInput = ({ field, ...props }: { field: any }) => {
  return (
    <div className="flex flex-row items-center w-full gap-2">
      <label className="text-sm font-medium text-gray-600 w-1/4">
        {field.txEtiqueta}
      </label>
      <input
        type="text"
        name={field.fieldName}
        disabled={field.isDisabled}
        {...props}
        className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
      />
    </div>
  );
};

const NumberInput = ({ field, ...props }: { field: any }) => {
  return (
    <div className="flex flex-row items-center w-full gap-2">
      <label className="text-sm font-medium text-gray-600 w-1/4">
        {field.txEtiqueta}
      </label>
      <input
        type="number"
        name={field.fieldName}
        disabled={field.isDisabled}
        {...props}
        className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
      />
    </div>
  );
};

const FechaInput = ({ field, ...props }: { field: any }) => {
  return (
    <div className="flex flex-row items-center w-full gap-2">
      <label className="text-sm font-medium text-gray-600 w-1/4">
        {field.txEtiqueta}
      </label>
      <input
        type="date"
        name={field.fieldName}
        disabled={field.isDisabled}
        {...props}
        className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
      />
    </div>
  );
};

const Area = ({ field, ...props }: { field: any }) => {
  return (
    <div className="flex flex-row items-center w-full gap-2">
      <label className="text-sm font-medium text-gray-600 w-1/4">
        {field.txEtiqueta}
      </label>
      <textarea
        name={field.fieldName}
        disabled={field.isDisabled}
        className="mt-1 text-gray-500 block w-full shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
        {...props}
      />
    </div>
  );
};

const Switch = ({ field, ...props }: any) => {
  return (
    <div className="flex flex-row items-center w-full gap-2">
      <label className="text-sm font-medium text-gray-600 w-1/4">
        {field.txEtiqueta}
      </label>
      <div className="relative inline-block w-10 mr-2 pt-3 align-middle select-none transition duration-700 ease-in">
        <input
          type="checkbox"
          name={field.fieldName}
          disabled={field.isDisabled}
          checked={props.value}
          className="toggle-checkbox absolute block w-5 h-5 border-gray-300 rounded-full bg-white focus:ring-offset-0 focus:ring-0 hover:bg-white appearance-none cursor-pointer"
          {...props}
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-200 cursor-pointer"
        />
      </div>
    </div>
  );
};

const SectionDivider = () => {
  return (
    <div className="relative flex items-center w-full my-4">
      <div className="flex-grow border-t border-gray-300 mx-4"></div>
      <span className="text-gray-600 text-sm font-medium px-2">TEXT</span>
      <div className="flex-grow border-t border-gray-300 mx-4"></div>
    </div>
  );
};
