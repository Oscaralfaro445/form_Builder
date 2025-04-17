import { CrudAction } from "../Models";

export const filterFields = (fields: any[], action: CrudAction) => {
  const filteredFields = fields
    .filter((field) =>
      action === CrudAction.CREATE ? field.bCrea : field.bEdita,
    )
    .map((field) => ({
      ...field,
      isDisable: field.isPk && action === CrudAction.UPDATE,
    }));
  return filteredFields;
};
