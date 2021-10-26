import { useState, useEffect, useMemo } from 'react';

import { FiSearch, FiX } from 'react-icons/fi';

import { Link, useRouteMatch } from 'react-router-dom';
import styles from './styles.module.scss';

import { LoadingTable } from '../../components/LoadingTable';

import { api } from '../../services/api';
import { Pagination } from '../../components/Pagination';

type RouteParams = {
  id: string;
};

type Log = {
  id: number;
  aluno_id: string;
  nome: string;
  ip: string;
  url: string;
  data: Date;
};

type AxiosResponse = {
  result: Log[];
  current_page: number;
  last_page: number;
};

export function StudentsLogs(): JSX.Element {
  const [logs, setLogs] = useState<Log[]>([]);
  const [searchedLogs, setSearchedLogs] = useState<Log[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [limit, setLimit] = useState(30);

  const [loading, setLoading] = useState(true);

  const [studentName, setStudentName] = useState('');

  const [hasSearch, setHasSearch] = useState(false);
  const [lastSearch, setLastSearch] = useState('');
  const [url, setUrl] = useState('');

  const { params } = useRouteMatch<RouteParams>();

  const pages = useMemo(() => {
    console.log(lastPage);
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }, [lastPage]);

  async function handleSearch() {
    setLoading(true);
    const response = await api.get<AxiosResponse>(`/students/${params.id}`, {
      params: {
        url,
        limit,
        page: currentPage,
      },
    });

    setSearchedLogs(response.data.result);
    setLastPage(response.data.last_page);
    setHasSearch(!!url);
    setUrl('');
    setLastSearch(url);
    setLoading(false);
  }

  function handleCleanSearch() {
    setUrl('');
    setHasSearch(false);
    setSearchedLogs(logs);
  }

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get<AxiosResponse>(`/students/${params.id}`, {
        params: {
          limit,
          page: currentPage,
        },
      })
      .then(response => {
        setLogs(response.data.result);
        setSearchedLogs(response.data.result);
        setStudentName(response.data.result[0].nome);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setLoading(false);
      });
  }, [limit, currentPage, params]);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            {studentName && <h2>Logs para {`"${studentName}"`}</h2>}
            {hasSearch && (
              <div className={styles.searchLabel}>
                <span>Você pesquisou por: {`"${lastSearch}"`}</span>
                <button onClick={handleCleanSearch} type="button">
                  <FiX size={14} />
                </button>
              </div>
            )}
          </article>

          <div>
            <input
              value={url}
              type="text"
              placeholder="Buscar URL..."
              onChange={event => setUrl(event.target.value)}
            />

            <button type="button" onClick={handleSearch}>
              Buscar <FiSearch size={16} />
            </button>
          </div>
        </header>

        {loading ? (
          <LoadingTable />
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>IP</th>
                  <th>Url</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {searchedLogs.map(log => (
                  <tr key={String(log.id)}>
                    <td>
                      <Link to="/">{log.ip}</Link>
                    </td>
                    <td>{log.url}</td>
                    <td>
                      <div>
                        <p>{log.data}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {lastPage && (
              <Pagination
                pages={pages}
                activePage={currentPage}
                onClick={handleChangePage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
