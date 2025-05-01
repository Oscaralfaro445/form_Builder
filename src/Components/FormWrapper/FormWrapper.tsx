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
      (acc: Record<string, Yup.AnySchema>, field: any) => {
        if (!field.bRequerido && !field.infdetComp) return acc;

        let validator:
          | Yup.StringSchema
          | Yup.NumberSchema
          | Yup.DateSchema
          | Yup.BooleanSchema;

        switch (field.cveTipoCampo) {
          case "number":
          case "numeric":
            validator = Yup.number().typeError(
              "Debe ser un número válido",
            ) as Yup.NumberSchema;

            if (field.bRequerido) {
              validator = validator.required("Campo requerido");
            }

            if (field.infdetComp) {
              if (field.infdetComp.NUM_ENTEROS !== undefined) {
                validator = validator.integer("Debe ser un número entero");
              }
              if (field.infdetComp.NUM_DECIMALES !== undefined) {
                validator = validator.test(
                  "decimales",
                  `No puede tener más de ${field.infdetComp.NUM_DECIMALES} decimales`,
                  (value) => {
                    if (!value) return true;
                    const decimalPart = value.toString().split(".")[1];
                    return (
                      !decimalPart ||
                      decimalPart.length <= field.infdetComp.NUM_DECIMALES
                    );
                  },
                );
              }
              if (field.infdetComp.VALOR_INICIAL !== undefined) {
                validator = validator.min(
                  Number(field.infdetComp.VALOR_INICIAL),
                  `El valor mínimo es ${field.infdetComp.VALOR_INICIAL}`,
                );
              }
            }
            break;

          case "string":
            validator = Yup.string() as Yup.StringSchema;

            if (field.bRequerido) {
              validator = validator.required("Campo requerido");
            }

            if (field.infdetComp) {
              if (field.infdetComp.NUM_LONG_MIN !== undefined) {
                validator = validator.min(
                  field.infdetComp.NUM_LONG_MIN,
                  `Mínimo ${field.infdetComp.NUM_LONG_MIN} caracteres`,
                );
              }
              if (field.infdetComp.NUM_LONG_MAX !== undefined) {
                validator = validator.max(
                  field.infdetComp.NUM_LONG_MAX,
                  `Máximo ${field.infdetComp.NUM_LONG_MAX} caracteres`,
                );
              }
              if (field.infdetComp.TX_REG_EXP) {
                try {
                  const regex = new RegExp(
                    field.infdetComp.TX_REG_EXP.replace(/\\\//g, ""),
                  );
                  validator = validator.matches(regex, "Formato inválido");
                } catch (error) {
                  console.error(
                    `Expresión regular inválida para ${field.nomComponente} ${error}`,
                  );
                }
              }
            }
            break;

          case "date":
            validator = Yup.date().typeError(
              "Fecha inválida",
            ) as Yup.DateSchema;

            if (field.bRequerido) {
              validator = validator.required("Campo requerido");
            }
            break;

          case "boolean":
            validator = Yup.boolean() as Yup.BooleanSchema;
            break;

          case "email":
            validator = Yup.string().email(
              "Correo electrónico inválido",
            ) as Yup.StringSchema;

            if (field.bRequerido) {
              validator = validator.required("Campo requerido");
            }
            break;

          default:
            validator = Yup.string() as Yup.StringSchema;
        }

        // Validación especial para combos
        if (field.cveTipoCompon === "COMBO" && field.bRequerido) {
          validator = Yup.string()
            .required("Campo requerido")
            .test(
              "no-default",
              "Seleccione una opción válida",
              (value) => value !== null && value !== undefined && value !== "0",
            ) as Yup.StringSchema;
        }

        acc[field.nomComponente] = validator;
        return acc;
      },
      {} as Record<string, Yup.AnySchema>,
    ),
  );

  console.log(validationSchema);

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
