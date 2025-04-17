import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combo } from "../../Combo/Combo";

const selectionCombo = {
  appKey: "INFRA",
  cache: false,
  cmpType: 5,
  dependantField: undefined,
  endpoint: "",
  fieldName: "pageSize",
  fnShow: undefined,
  formKey: "",
  hasValidation: true,
  helpText: undefined,
  htmlId: "INFRA-cveConsultas",
  isDisabled: false,
  isPk: false,
  isRequired: true,
  data: [
    {
      aplicacion: null,
      bGrid: true,
      cveAplicacion: "INFRA",
      cveNumber: 5,
      cveForma: null,
      cveTipoConsulta: "QUERY",
      numberValue: "5",
      forma: null,
      nomModelo: null,
      reportes: [],
    },
    {
      aplicacion: null,
      bGrid: true,
      cveAplicacion: "INFRA",
      cveNumber: 10,
      cveForma: null,
      cveTipoConsulta: "QUERY",
      numberValue: "10",
      forma: null,
      nomModelo: null,
      reportes: [],
    },
    {
      aplicacion: null,
      bGrid: true,
      cveAplicacion: "INFRA",
      cveNumber: 20,
      cveForma: null,
      cveTipoConsulta: "QUERY",
      numberValue: "20",
      forma: null,
      nomModelo: null,
      reportes: [],
    },
    {
      aplicacion: null,
      bGrid: true,
      cveAplicacion: "INFRA",
      cveNumber: 30,
      cveForma: null,
      cveTipoConsulta: "QUERY",
      numberValue: "30",
      forma: null,
      nomModelo: null,
      reportes: [],
    },
    {
      aplicacion: null,
      bGrid: true,
      cveAplicacion: "INFRA",
      cveNumber: 50,
      cveForma: null,
      cveTipoConsulta: "QUERY",
      numberValue: "50",
      forma: null,
      nomModelo: null,
      reportes: [],
    },
  ],
  key: "numberValue",
  label: "Tipos de Conciliaciones",
  labelKey: "TIPO_CONSULTA",
  maxLength: undefined,
  minLength: undefined,
  order: 1,
  relationFormKey: undefined,
  relationType: undefined,
  showInGrid: true,
  showOnCreate: true,
  showOnEdit: true,
  size: "SM",
  sizeClass: "col-4",
  type: "STRING",
  value: "cveNumber",
};

export const Header = () => {
  return (
    <div className="py-4 px-2 mb-3 flex items-center justify-between">
      <div className="text-sm flex items-center text-gray-700">
        Mostrar
        <div className="w-50 mr-2">
          <Combo field={selectionCombo} />
        </div>
        resultados
      </div>
      <div className="">
        <FontAwesomeIcon
          className="text-gray-400 text-sm cursor-pointer"
          icon={["fas", "sync"]}
        />
      </div>
    </div>
  );
};
