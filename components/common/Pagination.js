/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Pagination = ({ paginationData, setPage }) => {
  const { page, pageSize, totalPages, totalCount } = paginationData;

  return (
    <div className=" mt-4 px-4 py-3   border-t border-gray-200 sm:px-6 w-full">
      <div className="flex  justify-between sm:hidden w-full">
        <button
          className={`${
            page === 1
              ? " cursor-not-allowed bg-gray-200 text-gray-800 "
              : "bg-buttonbg text-buttontxt"
          } relative inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md `}
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Anterior
        </button>
        <button
          className={`${
            page === totalPages
              ? " cursor-not-allowed bg-gray-200 text-gray-800 "
              : "bg-buttonbg text-buttontxt"
          } ml-3 relative inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md`}
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Siguiente
        </button>
      </div>
      {/* DESKTOP */}
      <div className="wrapper flex w-full justify-center items-center">
        <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
          <p className="text-sm text-gray-700">
            Página <span className="font-medium">{page}</span> de{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
          <div className="mt-2">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                className={`${
                  page === 1 && " cursor-not-allowed"
                } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                //only  middle 5 pages
                return (
                  index >= page - 2 &&
                  index <= page + 2 && (
                    <button
                      key={index}
                      className={`${
                        page === index + 1
                          ? "bg-buttonbg text-buttontxt"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
                      onClick={() => {
                        setPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  )
                );
              })}

              <button
                className={`${
                  page === totalPages && " cursor-not-allowed"
                } relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                disabled={page === totalPages}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
