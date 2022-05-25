import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({ cardPerPage, totalCards, paginate, currentPage }) => {
  if (Math.ceil(totalCards / cardPerPage) < currentPage) {
    paginate(1);
  }
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pages.push(i);
  }
  console.log(pages, " este es el pages");
  return (
    <div className={styles.pagination}>
      <ul>
        {pages.length > 1 &&
          pages.map((p, i) =>
            p === currentPage ? (
              (console.log(i, "este es el parametro de p"),
              (
                <li key={i}>
                  <button className={styles.btn} onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              ))
            ) : (
              <li key={i}>
                <button className={styles.btn} onClick={() => paginate(p)}>
                  {p}
                </button>
              </li>
            )
          )}
      </ul>
    </div>
  );
};
export default Pagination;
