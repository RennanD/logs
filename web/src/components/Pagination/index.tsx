import styles from './styles.module.scss';

type PaginationProps = {
  pages: number[];
  activePage: number;
  onClick: (page: number) => void;
};

export function Pagination({
  pages,
  activePage,
  onClick,
}: PaginationProps): JSX.Element {
  return (
    <footer className={styles.container}>
      <aside>
        <p>
          <strong>1 </strong>
          até
          <strong> 10 </strong>
          de
          <strong> 3378</strong>
        </p>
      </aside>
      <aside>
        <ul className={styles.pagination}>
          {pages.map(page => (
            <li key={String(page)}>
              <button
                onClick={() => onClick(page)}
                className={activePage === page ? styles.activePage : ''}
                type="button"
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </footer>
  );
}
