// PaginationComponent.js
import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const PaginationComponent = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      forcePage={currentPage - 1} 
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default PaginationComponent;
