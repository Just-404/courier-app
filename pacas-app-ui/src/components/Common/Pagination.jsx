import ReactPaginate from "react-paginate";
import styles from "../../styles/itemsCard.module.css";
import "../../styles/pagination.css";
const Pagination = ({ data, onPageCount, pageCount, renderItem }) => {
  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    onPageCount(newPage);
  };
  return !data || data.length === 0 ? (
    <div style={{ height: "50%", textAlign: "center", fontSize: "20px" }}>
      Nothing was found
    </div>
  ) : (
    <>
      <div className={styles.itemsContainer}>
        {data.map((item) => renderItem(item))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active-link"
      />
    </>
  );
};

export default Pagination;
