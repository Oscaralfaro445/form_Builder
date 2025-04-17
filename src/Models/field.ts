export enum InputTypeId {
  TEXTO = "TEXTO",
  AREA = "AREA",
  NUMERO = "NUMERO",
  FECHA = "FECHA",
  COMBO = "COMBO",
  SWITCH = "SWITCH",
  LOOKUP = "LOOKUP",
  TYPEAHEAD = "TYPEAHEAD",
  FILE = "FILE",
  RELATION = "RELATION",
  SECTION = "SECTION",
  SEPARADOR = "SEPARADOR",
}

export interface FormElement {
  appKey: string;
  formKey: string;
}

export interface Field {
  cmpType: InputTypeId;
  fieldName: string;
  isPk: boolean;
  groupKey?: string;
  labelKey: string;
  label?: string;
  showInGrid: boolean;
  showInFilter: boolean;
  type: string;
  size: string;
  showOnCreate: boolean;
  showOnEdit: boolean;
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  isDisabled: boolean;
  sizeClass?: string;
  htmlId?: string;
  data?: [];
  key?: string;
  value?: string;
  endpoint?: string;
  cache: boolean;
  helpText?: string;
  relationType?: string;
  relationFormKey?: string;
  dependantField?: string;
  fnShow?: any;
}

export interface GenericField {
  cmpType: InputTypeId;
  appKey: string;
  formKey: string;
  completeUrl?: string;
  order: number;
  fieldName: string;
  isDisabled: boolean;
  isPk: boolean;
  hasValidation?: boolean;
  groupKey?: string;
  labelKey: string;
  label?: string;
  sizeClass?: string;
  htmlId?: string;
  showInGrid: boolean;
  type: string;
  size: string;
  showOnCreate: boolean;
  showOnEdit: boolean;
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  validationPattern?: string;
  maxIntegers?: number;
  minIntegers?: number;
  data?: any[];
  key: string;
  value: string;
  endpoint?: string;
  extensions?: string | string[];
  helpText?: string;
  cache: boolean;
  relationType?: string;
  relationFormKey?: string;
  fnShow?: any;
  dependantField?: string;
  showInFilter?: boolean;
}
