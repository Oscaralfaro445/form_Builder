import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorProps) => {
  const goToFirst = () => {
    if (currentPage > 1) onPageChange(1);
  };

  const goToPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const goToLast = () => {
    if (currentPage < totalPages) onPageChange(totalPages);
  };

  return (
    <div className="mt-4 py-4 px-2 flex items-center justify-between">
      <div className="flex w-28 justify-between text-gray-500 text-sm font-medium">
        Página {currentPage} de {totalPages}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div
          onClick={goToFirst}
          className={`flex justify-center items-center col-span-1 p-1 cursor-pointer hover:text-blue-700 ${currentPage === 1 && "opacity-30 pointer-events-none"}`}
          role="button"
        >
          <FontAwesomeIcon icon={["fas", "angle-double-left"]} />
        </div>
        <div
          onClick={goToPrev}
          className={`flex justify-center items-center col-span-1 p-1 cursor-pointer hover:text-blue-700 ${currentPage === 1 && "opacity-30 pointer-events-none"}`}
        >
          <FontAwesomeIcon icon={["fas", "angle-left"]} />
        </div>
        <div
          onClick={goToNext}
          className={`flex justify-center items-center col-span-1 p-1 cursor-pointer hover:text-blue-700 ${currentPage === totalPages && "opacity-30 pointer-events-none"}`}
        >
          <FontAwesomeIcon icon={["fas", "angle-right"]} />
        </div>
        <div
          onClick={goToLast}
          className={`flex justify-center items-center col-span-1 p-1 cursor-pointer hover:text-blue-700 ${currentPage === totalPages && "opacity-30 pointer-events-none"}`}
        >
          <FontAwesomeIcon icon={["fas", "angle-double-right"]} />
        </div>
      </div>
    </div>
  );
};
