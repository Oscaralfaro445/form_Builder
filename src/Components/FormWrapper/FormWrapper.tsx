import { Formik, FormikConfig, FormikValues } from "formik";
import * as Yup from "yup";

interface FormWrapperProps extends FormikConfig<FormikValues> {
  children: any;
  fields: any;
}

export const FormWrapper = ({
  children,
  fields,
  ...formikProps
}: FormWrapperProps) => {
  /* const defaultInitialValues = fields.reduce(
    (acc, field) => {
      acc[field.nomComponente] = field.infdetComp?.VALOR_INICIAL || "";
      return acc;
    },
    {} as Record<string, any>,
  ); */

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (acc: any, field: any) => {
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

  return (
    <Formik
      {...formikProps}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {children}
    </Formik>
  );
};
