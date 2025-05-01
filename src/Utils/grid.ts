import axios from "axios";

export const filterColumns = async (columns: any): Promise<any> => {
  return columns.filter((column: any) => column.cveTipoCampo !== "COMBO");
};

export const getGridsColumns = (fields: any) => {
  fields.reduce((acc: any, currentField: any) => {
    if (currentField.bGrid) {
      acc.push({
        field: currentField.nomComponente,
        headerName: currentField.txEtiqueta,
      });
    }

    return acc;
  }, []);
};

export const fetchGridData = async (
  endpoint: string,
  params: any,
  pageNumber: number,
) => {
  const response = await axios.get(`http://localhost:3002/api/${endpoint}`, {
    params: {
      pageSize: 10,
      pageNumber,
      ...params,
    },
  });

  const data = response.data;
  console.log(data);
};
