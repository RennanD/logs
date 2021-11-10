import { useState, useEffect } from 'react';

import { FiArrowLeft, FiSearch } from 'react-icons/fi';

import { Link, useRouteMatch } from 'react-router-dom';
import styles from './styles.module.scss';

import { LoadingTable } from '../../components/LoadingTable';

import { api } from '../../services/api';
import { Pagination } from '../../components/Pagination';

type RouteParams = {
  id: string;
};

type Log = {
  _id: string;
  student_id_keep: string;
  name: string;
  ip: string;
  url: string;
  date: string;
};

type AxiosResponse = {
  student_name: string;
  result: Log[];
  total_logs: number;
};

export function StudentsLogs(): JSX.Element {
  const [logs, setLogs] = useState<Log[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [studentName, setStudentName] = useState('');

  const [url, setUrl] = useState('');

  const { params } = useRouteMatch<RouteParams>();

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const limit = 10;

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    api
      .get<AxiosResponse>(`/students/${params.id}/logs`, {
        params: {
          limit,
          page: currentPage,
          url,
        },
      })
      .then(response => {
        setLogs(response.data.result);
        setStudentName(response.data.student_name);
        setLoading(false);
      });
  }, [limit, currentPage, params, url]);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <Link to="/students">
              <FiArrowLeft size={30} />
            </Link>
            <h3>Logs para {`"${studentName}"`}</h3>
          </article>

          <div>
            <input
              value={url}
              type="text"
              placeholder="Pesquisar..."
              onChange={event => setUrl(event.target.value)}
            />

            <FiSearch size={20} />
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
                {logs.map(log => (
                  <tr key={String(log._id)}>
                    <td>
                      <Link to="/">{log.ip}</Link>
                    </td>
                    <td>{log.url}</td>
                    <td>
                      <div>
                        <p>{log.date}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              pages={pages}
              activePage={currentPage}
              onClick={handleChangePage}
            />
          </>
        )}
      </main>
    </div>
  );
}
