import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiEye, FiSearch } from 'react-icons/fi';

import styles from './styles.module.scss';

import { LoadingTable } from '../../components/LoadingTable';
import { Pagination } from '../../components/Pagination';

import { api } from '../../services/api';

type User = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  role: {
    title: string;
  };
};

type AxiosResponse = {
  result: User[];
  total_users: number;
};

export function ListUsers(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
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
      .get<AxiosResponse>('/users', {
        params: {
          search,
          limit,
          page: currentPage,
        },
      })
      .then(response => {
        setUsers(response.data.result);
        setTotalUsers(response.data.total_users);
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
            <h2>Listagem de usuários</h2>
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
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role.title}</td>
                    <td>
                      <div>
                        <Link to={`/users/${user._id}/details`}>
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
              totalRegister={totalUsers}
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
