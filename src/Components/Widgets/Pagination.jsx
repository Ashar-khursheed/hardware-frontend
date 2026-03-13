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
    <div className="hbx-pagination-wrapper">
      {total / per_page > 1 ? (
        <ul className="hbx-custom-pagination">
          <li className={`hbx-page-item ${current_page === 1 ? "disabled" : ""}`}>
            <a className="hbx-page-link hbx-nav-btn" onClick={() => current_page > 1 && setPage(current_page - 1)}>
              <RiArrowLeftSLine />
            </a>
          </li>

          {/* First Page */}
          {current_page > 3 && (
            <li className="hbx-page-item">
              <a className="hbx-page-link" onClick={() => setPage(1)}>1</a>
            </li>
          )}

          {/* Ellipsis if too many pages before */}
          {current_page > 4 && (
            <li className="hbx-page-item disabled hbx-ellipsis"><span className="hbx-page-link">...</span></li>
          )}

          {/* Page numbers around current */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => page >= current_page - 2 && page <= current_page + 2)
            .map((i) => (
              <li className={`hbx-page-item ${current_page === i ? "active" : ""}`} key={i}>
                <a className="hbx-page-link" onClick={() => setPage(i)}>
                  {i}
                </a>
              </li>
            ))}

          {/* Ellipsis if too many pages after */}
          {current_page < totalPages - 3 && (
            <li className="hbx-page-item disabled hbx-ellipsis"><span className="hbx-page-link">...</span></li>
          )}

          {/* Last Page */}
          {current_page < totalPages - 2 && (
            <li className="hbx-page-item">
              <a className="hbx-page-link" onClick={() => setPage(totalPages)}>{totalPages}</a>
            </li>
          )}

          <li className={`hbx-page-item ${current_page === totalPages ? "disabled" : ""}`}>
            <a
              className="hbx-page-link hbx-nav-btn"
              onClick={() => current_page < totalPages && setPage(current_page + 1)}
            >
              <RiArrowRightSLine />
            </a>
          </li>
        </ul>
      ) : (
        <ul className="hbx-custom-pagination single-page">
          <li className={`hbx-page-item disabled`}>
            <a className="hbx-page-link hbx-nav-btn">
              <RiArrowLeftSLine />
            </a>
          </li>
          <li className="hbx-page-item active">
            <a className={`hbx-page-link`}>1</a>
          </li>
          <li className={`hbx-page-item disabled`}>
            <a className="hbx-page-link hbx-nav-btn">
              <RiArrowRightSLine />
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
