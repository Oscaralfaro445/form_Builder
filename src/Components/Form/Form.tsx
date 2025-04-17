import { useEffect, useState } from "react";
import { FormHorientation, InputTypeId } from "../../Models";
import { Input } from "../Input/Input";
import { TooltipIcon } from "../TooltipIcon/TooltipIcon";

// Puedes extender esto con más propiedades si sabes qué contienen tus campos
interface Field {
  cveTipoCompon: InputTypeId;
  cveTamanoCampo: string;
  sizeClass?: string;
  [key: string]: any;
}

interface FormProps {
  value?: any;
  formHandler: any;
  fields: Field[];
  position?: FormHorientation;
  hasValidation?: boolean;
}

const initialState = {
  form: {},
  isLoading: false,
  isValid: false,
  rows: [] as Field[],
};

const getSizeNumberClass = (size: string) => {
  switch (size) {
    case "XL":
      return 12;
    case "LG":
      return 9;
    case "SM":
      return 4;
    case "XS":
      return 3;
    default:
      return 6;
  }
};

export const Form = ({
  fields,
  formHandler,
  position = FormHorientation.HORIZONTAL,
}: FormProps) => {
  const [state, setState] = useState(initialState);
  const { rows } = state;

  useEffect(() => {
    const processedFields: Field[] = fields.map((field) => {
      let size: number;

      if (position === FormHorientation.HORIZONTAL) {
        size =
          field.cveTipoCompon === InputTypeId.RELATION
            ? 12
            : getSizeNumberClass(field.cveTamanoCampo);
      } else {
        size = field.cveTipoCompon === InputTypeId.SWITCH ? 4 : 12;
      }

      return {
        ...field,
        sizeClass: `col-span-${size}`,
      };
    });

    setState((prev) => ({ ...prev, rows: processedFields }));
  }, [fields, position]);

  return (
    <div className="flex w-full py-6 items-center justify-between">
      <div className="w-3/4 mt-2 grid grid-cols-2 gap-4">
        {rows.map((field) => (
          <>
            <Input
              key={field.nomComponente}
              field={field}
              {...formHandler.getFieldProps(field.nomComponente)}
            />
            {console.log(field.txAyuda)}
            {field.txAyuda && <TooltipIcon message={field.txAyuda} />}
          </>
        ))}
      </div>
    </div>
  );
};
