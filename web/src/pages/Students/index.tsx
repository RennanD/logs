import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiEye, FiSearch, FiX } from 'react-icons/fi';

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
  const [searchStudents, setSearchStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [hasSearch, setHasSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSearch, setLastSearch] = useState('');

  async function handleSearch() {
    setLoading(true);
    const response = await api.get<AxiosResponse>('/students', {
      params: {
        search,
      },
    });

    setSearchStudents(response.data.result);
    setHasSearch(!!search);
    setLastSearch(search);
    setLoading(false);
  }

  async function handleCleanSearch() {
    setSearch('');
    setHasSearch(false);
    setSearchStudents(students);
  }

  useEffect(() => {
    api.get<AxiosResponse>('/students').then(response => {
      setStudents(response.data.result);
      setSearchStudents(response.data.result);
      setLoading(false);
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
                <span>Você pesquisou por: {`"${lastSearch}"`}</span>
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
              {searchStudents.map(student => (
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
