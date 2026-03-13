"use client";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Pagination = ({ current_page, total, per_page, setPage }) => {
  let pages = [];
  let totalPages = Math.ceil(total / per_page);
  let startpage = totalPages === 4 ? 1 : current_page === 1 || current_page - 2 === 0 ? 1 : current_page === totalPages ? current_page - 2 : current_page - 1;
  let endPage = totalPages === 4 ? 4 : current_page === 1 ? current_page + 2 : current_page + 1 <= totalPages ? current_page + 1 : current_page;
  for (let i = startpage; i <= endPage; i++) {
    i <= totalPages && pages.push(i);
  }
  return (
    <>
      {total / per_page > 1 ? (
        <ul className="pagination">
          <li className={`page-item ${current_page === 1 ? "disabled" : ""}`}>
            <a className="page-link" onClick={() => current_page > 1 && setPage(current_page - 1)}>
              <RiArrowLeftSLine />
            </a>
          </li>

          {/* First Page */}
          {current_page > 3 && (
            <li className="page-item">
              <a className="page-link" onClick={() => setPage(1)}>1</a>
            </li>
          )}

          {/* Ellipsis if too many pages before */}
          {current_page > 4 && (
            <li className="page-item disabled"><span className="page-link">...</span></li>
          )}

          {/* Page numbers around current */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => page >= current_page - 2 && page <= current_page + 2)
            .map((i) => (
              <li className={`page-item ${current_page === i ? "active" : ""}`} key={i}>
                <a className="page-link" onClick={() => setPage(i)}>
                  {i}
                </a>
              </li>
            ))}

          {/* Ellipsis if too many pages after */}
          {current_page < totalPages - 3 && (
            <li className="page-item disabled"><span className="page-link">...</span></li>
          )}

          {/* Last Page */}
          {current_page < totalPages - 2 && (
            <li className="page-item">
              <a className="page-link" onClick={() => setPage(totalPages)}>{totalPages}</a>
            </li>
          )}

          <li className={`page-item ${current_page === totalPages ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => current_page < totalPages && setPage(current_page + 1)}
            >
              <RiArrowRightSLine />
            </a>
          </li>
        </ul>
      ) : (
        <ul className="pagination justify-content-center">
          <li className={`page-item disabled`}>
            <a className="page-link">
              <RiArrowLeftSLine />
            </a>
          </li>
          <li className="page-item ">
            <a className={`page-link active`}>1</a>
          </li>
          <li className={`page-item disabled`}>
            <a className="page-link">
              <RiArrowRightSLine />
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;
