import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { currentPage, itemCount, totalItems, totalPages } = pagination;
  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  function getNumPages(totalPages) {
    const ar = [];
    for (let i = 1; i <= totalPages; i++) {
      ar.push(
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return ar;
  }
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {getNumPages(totalPages)}
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Pagination;
