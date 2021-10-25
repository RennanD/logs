import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiEye, FiSearch } from 'react-icons/fi';

import styles from './styles.module.scss';
import { api } from '../../services/api';
import { LoadingTable } from '../../components/LoadingTable';

type Student = {
  aluno_id: string;
  nome: string;
};

type AxiosResponse = {
  result: Student[];
};

export function Students(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AxiosResponse>('/students', {
        params: {
          search,
        },
      })
      .then(response => {
        setStudents(response.data.result);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className={styles.container}>
      <header className={styles.headerContent}>
        <Link to="/">
          <h1>
            Log Monitor <span>.</span>
          </h1>
        </Link>
      </header>
      <main className={styles.mainContent}>
        <header>
          <article>
            <h2>Listam de alunos</h2>
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
        )}
      </main>
    </div>
  );
}
