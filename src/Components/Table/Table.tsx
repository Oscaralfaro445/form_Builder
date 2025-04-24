import { useState } from "react";
import { Grid } from "../Grid/Grid";
import { Paginator } from "../Paginator/Paginator";
import { Header } from "./Header/Header";

export const Table = ({
  selectedRow,
  handleSelectedRow,
  externalLoading,
}: {
  selectedRow: number | null;
  handleSelectedRow: any;
  externalLoading: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col px-6 bg-white rounded-md shadow-sm">
      <Header />
      <Paginator
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Grid
        currentPage={currentPage}
        selectedRow={selectedRow}
        handleSelectedRow={handleSelectedRow}
        externalLoading={externalLoading}
      />
    </div>
  );
};
