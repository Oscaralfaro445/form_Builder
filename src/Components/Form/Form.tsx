import { useFormikContext, FormikValues } from "formik";
import { Input } from "../Input/Input";

interface FormProps {
  fields: any;
}

export const Form = ({ fields }: FormProps) => {
  const formik = useFormikContext<FormikValues>();

  return (
    <div className="w-full max-w-2xl py-6 space-y-4">
      {fields.map((field: any) => (
        <div key={field.nomComponente} className="w-full">
          <Input
            field={field}
            name={field.nomComponente}
            value={formik.values[field.nomComponente]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={field.isDisabled}
          />

          {formik.touched[field.nomComponente] &&
            formik.errors[field.nomComponente] && (
              <div className="text-red-500 text-sm mt-1">
                {String(formik.errors[field.nomComponente])}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
