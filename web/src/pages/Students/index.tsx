import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiEye, FiSearch } from 'react-icons/fi';

import styles from './styles.module.scss';

import { LoadingTable } from '../../components/LoadingTable';
import { Pagination } from '../../components/Pagination';

import { api } from '../../services/api';

type Student = {
  _id: string;
  student_id_keep: string;
  name: string;
};

type AxiosResponse = {
  result: Student[];
  total_students: number;
};

export function Students(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStundents, setTotalStudents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const limit = 10;

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }
  function handleSearch(search_text: string) {
    setCurrentPage(1);
    setSearch(search_text);
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
        setTotalStudents(response.data.total_students);
        setLoading(false);
      });
  }, [search, limit, currentPage]);

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
              onChange={event => handleSearch(event.target.value)}
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
            <Pagination
              totalRegister={totalStundents}
              currentPage={currentPage}
              limit={limit}
              onPageChange={handleChangePage}
            />
          </>
        )}
      </main>
    </div>
  );
}
