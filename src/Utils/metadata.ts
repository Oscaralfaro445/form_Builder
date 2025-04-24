import axios from "axios";

export const getFormMetadata = (formKey: string) => {
  const localStorageKey = getLocalStorageKey(formKey);
  const savedForm = getForm(localStorageKey);

  return savedForm ? savedForm : getFormFromServer(formKey, localStorageKey);
};

const getFormFromServer = async (formKey: string, localStorageKey: string) => {
  try {
    const response = await axios.get("http://localhost:3002/api/data", {
      params: {
        cveAplicacion: "INFRA",
        cveForma: formKey,
      },
    });

    const formMetadata = response.data;
    saveForm(localStorageKey, formMetadata);

    return formMetadata;
  } catch (error) {
    console.error("Error al obtener el formulario:", error);
    return null;
  }
};

const getLocalStorageKey = (formKey: string) => {
  return `@FormMetadata:INFRA:${formKey}`;
};

const saveForm = (key: string, form: any) => {
  return localStorage.setItem(key, JSON.stringify(form));
};

const getForm = (key: string) => {
  const parseValue = localStorage.getItem(key);

  if (!parseValue) return null;

  return JSON.parse(parseValue);
};

export const getHeaderRows = (fields: any) => {
  return fields.filter((field: any) => field.bGrid);
};

export const getFilterFields = (fields: any) => {
  if (!fields) return [];

  return fields
    .filter((field: any) => field?.bFiltra)
    .map((field: any) => ({ ...field, cveTamanoCampo: "SM" }));
};
