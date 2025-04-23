import { useFormik } from "formik";
import { Form } from "../Form/Form";
import * as Yup from "yup";

interface FormStructureProps {
  fields: any[];
  handleSubmit: (values: any, helpers: any) => void;
}

export const FormStructure = ({
  fields,
  handleSubmit: onSubmit,
}: FormStructureProps) => {
  const defaultInitialValues = fields.reduce(
    (acc, field) => {
      acc[field.nomComponente] = field.infdetComp?.VALOR_INICIAL || "";
      return acc;
    },
    {} as Record<string, any>,
  );

  console.log("defaultInitialValues", defaultInitialValues);

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (acc, field) => {
        if (!field.bRequerido && !field.infdetComp) return acc;

        let validator: Yup.AnySchema;
        switch (field.cveTipoCampo) {
          case "number":
            validator = Yup.number().required("Campo requerido");
            break;
          default:
            validator = Yup.string();
        }

        acc[field.nomComponente] = validator;
        return acc;
      },
      {} as Record<string, any>,
    ),
  );

  console.log("validationSchema", validationSchema);

  const formik = useFormik({
    initialValues: defaultInitialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const formHandler = {
    values: formik.values,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleSubmit: formik.handleSubmit,
    touched: formik.touched as Record<string, boolean>,
    errors: formik.errors as Record<string, string>,
  };

  return <Form fields={fields} formHandler={formHandler} />;
};
