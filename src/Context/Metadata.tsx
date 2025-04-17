import { createContext, useReducer } from "react";
import { ContextValue } from "../Models/metadata";
import { getFormMetadata } from "../Utils/metadata";

const MetadataContext = createContext<ContextValue | null>(null);

interface MetadataProviderProps {
  children: React.ReactNode;
}

const initialState = {
  name: null,
  metadata: null,
  loading: true,
  error: null,
};

const metadataReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_METADATA":
      return { ...state, loading: true };

    case "SET_METADATA":
      return { ...state, loading: false, metadata: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

const MetadataProvider = ({ children }: MetadataProviderProps) => {
  const [state, dispatch] = useReducer(metadataReducer, initialState);
  const { name, metadata, loading, error } = state;

  const fetchFormMetadata = async (formKey: string) => {
    dispatch({ type: "FETCH_METADATA" });

    try {
      const form = await getFormMetadata(formKey);
      dispatch({ type: "SET_METADATA", payload: form });
    } catch (error) {
      const err = error as Error;
      dispatch({
        type: "SET_ERROR",
        payload: err || "Error al obtener los metadatos",
      });
    }
  };

  const value = {
    name,
    metadata,
    loading,
    error,
    fetchFormMetadata,
  };

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
};

export { MetadataContext, MetadataProvider };
