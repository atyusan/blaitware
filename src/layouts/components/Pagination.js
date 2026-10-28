import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ section, currentPage, totalPages }) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const pageHref = (page) => {
    if (page <= 1) return section ? `/${section}` : "/";
    return `${section ? "/" + section : ""}/page/${page}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="col-12 pt-5">
      <ul className="pagination mb-0 flex flex-wrap justify-center">
        {hasPrevPage && (
          <li className="page-item">
            <Link
              href={pageHref(currentPage - 1)}
              className="page-link arrow"
              aria-label="Pagination Arrow"
            >
              <FaAngleLeft />
            </Link>
          </li>
        )}

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li className="page-item" key={`page-${page}`}>
              <Link
                href={pageHref(page)}
                className={`page-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {hasNextPage && (
          <li className="page-item">
            <Link
              href={pageHref(currentPage + 1)}
              className="page-link arrow"
              aria-label="Pagination Arrow"
            >
              <FaAngleRight />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
