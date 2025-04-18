import { useEffect, useState } from "react";
import { InputTypeId } from "../../Models";
import { Input } from "../Input/Input";
import { TooltipIcon } from "../TooltipIcon/TooltipIcon";
import { FormikValues } from "formik";

interface Field {
  nomComponente: string;
  cveTipoCompon: InputTypeId;
  cveTamanoCampo: string;
  txEtiqueta: string;
  txAyuda?: string;
  bRequerido: boolean;
  infdetComp?: {
    VALOR_INICIAL?: string;
    NUM_LONG_MIN?: number;
    NUM_LONG_MAX?: number;
    TX_REG_EXP?: string;
  };
  [key: string]: any;
}

interface FormState {
  isLoading: boolean;
  rows: (Field & {
    error?: string;
  })[];
}

interface FormProps {
  fields: Field[];
  formHandler: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  };
  submitText?: string;
}

const initialState: FormState = {
  isLoading: false,
  rows: [],
};

export const Form = ({
  fields,
  formHandler,
  submitText = "Enviar",
}: FormProps) => {
  const [state, setState] = useState<FormState>(initialState);
  const { rows } = state;

  useEffect(() => {
    const processedFields = fields.map((field) => {
      const error = formHandler.touched[field.nomComponente]
        ? (formHandler.errors[field.nomComponente] as string | undefined)
        : undefined;

      return {
        ...field,
        error,
      };
    });

    setState((prev) => ({
      ...prev,
      rows: processedFields,
    }));
  }, [fields, formHandler.errors, formHandler.touched]);

  return (
    <form
      onSubmit={formHandler.handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="space-y-6 p-6">
        {rows.map((field) => (
          <div key={field.nomComponente} className="w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <Input field={field} />
                </div>
                {field.txAyuda && (
                  <div className="pt-2">
                    <TooltipIcon message={field.txAyuda} />
                  </div>
                )}
              </div>
              {field.error && (
                <p className="text-red-500 text-sm mt-1">{field.error}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};
