import { useEffect, useState } from "react";

interface GridProps {
  currentPage: number;
}

export const Grid = ({ currentPage }: GridProps) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/table?skip=${(currentPage - 1) * 10}&take=10`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="align-middle inline-block min-w-full">
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
              <tr key={index} className="cursor-pointer">
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
