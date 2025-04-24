import { useEffect, useState } from "react";
import { useMetadata } from "../../Context/useMetadata";
import { Form } from "../Form/Form";
import { filterFields } from "../../Utils/crud";

export const Window = ({ action }: { action: any }) => {
  const { metadata } = useMetadata();
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    const filtered = filterFields(metadata?.infComponente, action);
    setFields(filtered);
  }, [metadata, action]);

  return (
    <div className="w-full bg-white">
      {fields.length > 0 && <Form fields={fields} />}
    </div>
  );
};
