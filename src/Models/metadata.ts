export enum CrudAction {
  CREATE,
  UPDATE,
}

export type ActionType =
  | { type: "FETCH_METADATA" }
  | { type: "SET_METADATA"; payload: any }
  | { type: "SET_ERROR"; payload: Error };

export type StateType = {
  name: string | null;
  metadata: any | null;
};

export type ContextValue = {
  name: string | null;
  metadata: any | null;
  loading: boolean;
  error: Error | null;
  fetchFormMetadata: (formKey: string) => void;
};

export enum FormHorientation {
  HORIZONTAL,
  VETICAL,
}
