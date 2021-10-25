import { useState, useEffect, useMemo } from 'react';

import { FiEye, FiSearch } from 'react-icons/fi';

import styles from './styles.module.scss';
import { api } from '../../services/api';
import { LoadingTable } from '../../components/LoadingTable';
import { Pagination } from '../../components/Pagination';

type Student = {
  aluno_id: string;
  nome: string;
};

type AxiosResponse = {
  result: Student[];
  current_page: number;
  last_page: number;
};

export function Students(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [lastPage, setLastPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  // const pages = useMemo(() => {
  //   const arrayPages = [];
  //   for (let count = currentPage; count >= lastPage; count + 1) {
  //     if (arrayPages.length < 10) {
  //       arrayPages.push(count);
  //     }
  //   }

  //   return
  // }, [currentPage, lastPage]);

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    api
      .get<AxiosResponse>('/students', {
        params: {
          search,
          limit,
          page: currentPage,
        },
      })
      .then(response => {
        setStudents(response.data.result);
        setCurrentPage(response.data.current_page);
        setCurrentPage(response.data.last_page);
        setLoading(false);
      });
  }, [search, limit, currentPage]);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <h2>Listagem de alunos</h2>
          </article>

          <div>
            <input
              value={search}
              type="text"
              placeholder="Pesquisar..."
              onChange={event => setSearch(event.target.value)}
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
                  <th>#ID</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.aluno_id}>
                    <td>{student.aluno_id}</td>
                    <td>{student.nome}</td>
                    <td>
                      <div>
                        <a href="/">
                          <FiEye size={16} />
                          Visualizar
                        </a>
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
