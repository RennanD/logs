import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiEye, FiSearch, FiX } from 'react-icons/fi';

import styles from './styles.module.scss';
import { api } from '../../services/api';

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
  const [hasSearch, setHasSearch] = useState(false);
  // const []

  async function handleSearch() {
    console.log('chamou');
    const response = await api.get<AxiosResponse>('/students', {
      params: {
        search,
      },
    });

    setStudents(response.data.result);
    setHasSearch(!!search);
    console.log('finalizou');
  }

  async function handleCleanSearch() {
    setSearch('');
    setHasSearch(false);
    const response = await api.get<AxiosResponse>('/students');
    setStudents(response.data.result);
  }

  useEffect(() => {
    api.get<AxiosResponse>('/students').then(response => {
      setStudents(response.data.result);
    });
  }, []);

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
            {hasSearch && (
              <div className={styles.searchLabel}>
                <span>Você pesquisou por: {`"${search}"`}</span>
                <button onClick={handleCleanSearch} type="button">
                  <FiX size={14} />
                </button>
              </div>
            )}
          </article>

          <div>
            <input
              value={search}
              type="text"
              placeholder="Pesquisar..."
              onChange={event => setSearch(event.target.value)}
            />
            <button onClick={handleSearch} type="button">
              Buscar
              <FiSearch size={16} />
            </button>
          </div>
        </header>

        <table>
          <thead>
            <th>#ID</th>
            <th>Nome</th>
            <th>Ações</th>
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
      </main>
    </div>
  );
}
