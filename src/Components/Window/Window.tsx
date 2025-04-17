import { useEffect, useState } from "react";
import { Form } from "../Form/Form";
import { CrudAction } from "../../Models/metadata";
import { useMetadata } from "../../Context/useMetadata";
import { filterFields } from "../../Utils/crud";

export const Window = ({
  formHandler,
  action,
}: {
  formHandler: any;
  action: CrudAction;
}) => {
  const { metadata } = useMetadata();
  const [fields, setFields] = useState([] as any[]);

  useEffect(() => {
    const filtered = filterFields(metadata?.infComponente as any[], action);
    setFields(filtered);
  }, [metadata, action]);

  return (
    <div className="w-full bg-white">
      {fields.length > 0 && (
        <Form fields={fields} hasValidation={false} formHandler={formHandler} />
      )}
    </div>
  );
};
