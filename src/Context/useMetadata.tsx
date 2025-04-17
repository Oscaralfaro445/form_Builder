import { useContext } from "react";
import { ContextValue } from "../Models/metadata";
import { MetadataContext } from "./Metadata";

const useMetadata = (): ContextValue => {
  const context = useContext(MetadataContext);

  if (!context) {
    throw new Error("You must use Metadata hook inside the provider");
  }

  return context;
};

export { useMetadata };
