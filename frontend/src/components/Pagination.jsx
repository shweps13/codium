import styles from '../css/Pagination.module.css';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        <span className={styles.iconWrapper}>
          <IoArrowBack size={16} />
        </span>
        Previous
      </button>

      <div className={styles.pageNumbers}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.paginationButton}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
        <span className={styles.iconWrapper}>
          <IoArrowForward />
        </span>
      </button>
    </div>
  );
}
