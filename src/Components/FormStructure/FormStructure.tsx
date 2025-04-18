import { useFormik } from "formik";
import { Form } from "../Form/Form";
import * as Yup from "yup";

interface FormStructureProps {
  fields: any[];
  onSubmit: (values: any, helpers: any) => void;
  initialValues?: Record<string, any>;
}

export const FormStructure = ({
  fields,
  onSubmit,
  initialValues: externalInitialValues,
}: FormStructureProps) => {
  const defaultInitialValues = fields.reduce(
    (acc, field) => {
      acc[field.nomComponente] = field.infdetComp?.VALOR_INICIAL || "";
      return acc;
    },
    {} as Record<string, any>,
  );

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (acc, field) => {
        if (!field.bRequerido) return acc;

        let validator = Yup.string().required(
          `${field.txEtiqueta} es requerido`,
        );

        if (field.infdetComp) {
          if (field.infdetComp.NUM_LONG_MIN) {
            validator = validator.min(
              field.infdetComp.NUM_LONG_MIN,
              `Mínimo ${field.infdetComp.NUM_LONG_MIN} carácteres`,
            );
          }
        }

        acc[field.nomComponente] = validator;
        return acc;
      },
      {} as Record<string, any>,
    ),
  );

  const formik = useFormik({
    initialValues: externalInitialValues || defaultInitialValues,
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
