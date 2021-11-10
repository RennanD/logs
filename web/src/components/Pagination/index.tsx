import { useEffect, useState } from 'react';
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
  // const [pages, setPages] = useState({
  //   first: '1',
  //   second: '2',
  //   third: '3',
  //   fourth: '4',
  //   fifth: '5',
  //   sixth: '...',
  //   seventh: '338',
  // });

  // useEffect(() => {
  //   const beforPages = activePage - 1;
  //   const afterPages = activePage + 1;

  //   if (activePage > 2) {
  //     setPages(oldState => ({
  //       ...oldState,
  //       first: '1',
  //     }));

  //     if (activePage > 3) {
  //       setPages(oldState => ({
  //         ...oldState,
  //         second: '...',
  //       }));
  //     }
  //   }
  //   for (
  //     let pageLenght = beforPages;
  //     pageLenght <= afterPages;
  //     pageLenght + 1
  //   ) {
  //     setPages(oldState => ({
  //       ...oldState,
  //       third: String(pageLenght),
  //     }));
  //   }

  //   if (activePage < totalPages - 1) {
  //     setPages(oldState => ({
  //       ...oldState,
  //       seventh: String(totalPages),
  //     }));

  //     if (activePage < totalPages - 2) {
  //       setPages(oldState => ({
  //         ...oldState,
  //         sixth: '...',
  //       }));
  //     }
  //   }
  // }, [activePage, totalPages]);

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
          {/* <li>
            <button
              className={
                String(activePage) === pages.first ? styles.activePage : ''
              }
              type="button"
            >
              {pages.first}
            </button>
          </li>
          <li>
            <button
              className={
                String(activePage) === pages.second ? styles.activePage : ''
              }
              type="button"
            >
              {pages.second}
            </button>
          </li>
          <li>
            <button
              className={
                String(activePage) === pages.third ? styles.activePage : ''
              }
              type="button"
            >
              {pages.third}
            </button>
          </li>
          <li>
            <button
              className={
                String(activePage) === pages.fourth ? styles.activePage : ''
              }
              type="button"
            >
              {pages.fourth}
            </button>
          </li>
          <li>
            <button
              className={
                String(activePage) === pages.first ? styles.activePage : ''
              }
              type="button"
            >
              {pages.fifth}
            </button>
          </li>
          <li>
            <button
              className={
                String(activePage) === pages.first ? styles.activePage : ''
              }
              type="button"
            >
              {pages.sixth}
            </button>
          </li>
          <li>
            <button
              className={
                String(activePage) === pages.first ? styles.activePage : ''
              }
              type="button"
            >
              {pages.seventh}
            </button>
          </li> */}
        </ul>
      </aside>
    </footer>
  );
}
