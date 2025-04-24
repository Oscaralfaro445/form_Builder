import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";

interface GridProps {
  currentPage: number;
  selectedRow: number | null;
  handleSelectedRow: (row: number | null, data: any) => void;
  externalLoading: boolean;
}

export const Grid = ({
  currentPage,
  selectedRow,
  handleSelectedRow,
  externalLoading,
}: GridProps) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/table?skip=${(currentPage - 1) * 10}&take=5`,
        //s"https://6806ecece81df7060eb85ba3.mockapi.io/api/v1/dataTable/",
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const tableData = await response.json();
      setData(tableData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      alert("Error al obtener los datos");
    }
  };

  useEffect(() => {
    fetchData();
    handleSelectedRow(null, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, externalLoading]);

  if (externalLoading)
    return (
      <div className="w-full h-52 my-4 flex justify-center items-center">
        {" "}
        <Spinner size="md" />
      </div>
    );

  return (
    <div className="p-4 align-middle inline-block min-w-full">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((headerName) => (
                  <th
                    scope="col"
                    key={headerName}
                    className="px-auto py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap"
                  >
                    {headerName}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${selectedRow === index ? "bg-indigo-50 text-white" : ""} `}
                onClick={() => {
                  handleSelectedRow(index, row);
                }}
              >
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-6 py-3 text-center">
                    <div className="text-xs text-gray-500">{String(value)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
