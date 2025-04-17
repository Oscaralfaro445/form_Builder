import { Field } from "../../Models/field";
import { Button } from "../Button/Button";
import { Table } from "../Table/Table";

export const Relation = ({ field }: { field: any }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h6 className="text-lg font-medium">{field?.label}</h6>
        </div>
        <div>
          <Button
            title="Agregar"
            theme="success"
            icon="plus"
            onClick={() => {}}
          />
          <Button
            title="Eliminar"
            theme="success"
            icon="trash-alt"
            onClick={() => {}}
          />
          <Button
            title="Actualizar"
            theme="success"
            icon="pen-fancy"
            onClick={() => {}}
          />
        </div>
      </div>

      <Table />
    </div>
  );
};
