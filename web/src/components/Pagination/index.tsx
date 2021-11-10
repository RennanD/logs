import styles from './styles.module.scss';

type PaginationProps = {
  totalRegister: number;
  limit?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export function Pagination({
  totalRegister,
  limit = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps): JSX.Element {
  const lastPage = Math.ceil(totalRegister / limit);
  const startPage = (currentPage - 1) * limit + 1;
  const endPage = startPage + limit - 1;

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage),
        )
      : [];

  return (
    <footer className={styles.container}>
      <aside>
        <p>
          <strong>{startPage} </strong>
          até
          <strong> {endPage < totalRegister ? endPage : totalRegister} </strong>
          de
          <strong> {totalRegister}</strong>
        </p>
      </aside>
      <aside>
        <ul className={styles.pagination}>
          {currentPage > 1 + SIBLINGS_COUNT && (
            <>
              <li>
                <button onClick={() => onPageChange(1)} type="button">
                  1
                </button>
              </li>
              {currentPage > 2 + SIBLINGS_COUNT && (
                <li>
                  <div>
                    <span>...</span>
                  </div>
                </li>
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map(page => (
              <li key={page}>
                <button onClick={() => onPageChange(page)} type="button">
                  {page}
                </button>
              </li>
            ))}

          <li>
            <button
              onClick={() => onPageChange(currentPage)}
              className={styles.activePage}
              type="button"
            >
              {currentPage}
            </button>
          </li>

          {nextPages.length > 0 &&
            nextPages.map(page => (
              <li key={page}>
                <button onClick={() => onPageChange(page)} type="button">
                  {page}
                </button>
              </li>
            ))}

          {currentPage + SIBLINGS_COUNT < lastPage && (
            <>
              {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
                <li>
                  <div>
                    <span>...</span>
                  </div>
                </li>
              )}
              <li>
                <button onClick={() => onPageChange(lastPage)} type="button">
                  {lastPage}
                </button>
              </li>
            </>
          )}
        </ul>
      </aside>
    </footer>
  );
}
