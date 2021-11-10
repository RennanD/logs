import { useState, useEffect } from 'react';

import { FiArrowLeft, FiEye, FiSearch } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { api } from '../../services/api';
import { LoadingTable } from '../../components/LoadingTable';
// import { Pagination } from '../../components/Pagination';

type Student = {
  _id: string;
  student_id_keep: string;
  name: string;
};

type AxiosResponse = {
  result: Student[];
  total_students: number;
  // last_page: number;
};

export function Students(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
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

  // const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const limit = 10;

  // function handleChangePage(page: number) {
  //   setCurrentPage(page);
  // }

  useEffect(() => {
    api
      .get<AxiosResponse>('/students', {
        params: {
          search,
          limit,
        },
      })
      .then(response => {
        setStudents(response.data.result);
        setLoading(false);
      });
  }, [search, limit]);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <Link to="/">
              <FiArrowLeft size={30} />
            </Link>
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
                  <tr key={student._id}>
                    <td>{student.student_id_keep}</td>
                    <td>{student.name}</td>
                    <td>
                      <div>
                        <Link to={`/students/${student._id}/logs`}>
                          <FiEye size={16} />
                          Visualizar
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Pagination
              pages={pages}
              activePage={currentPage}
              onClick={handleChangePage}
            /> */}
          </>
        )}
      </main>
    </div>
  );
}
