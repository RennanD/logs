import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiEye } from 'react-icons/fi';

import styles from './styles.module.scss';

import { LoadingTable } from '../../components/LoadingTable';
import { Pagination } from '../../components/Pagination';

import { api } from '../../services/api';

type Role = {
  _id: string;
  title: string;
  slug: string;
};

type AxiosResponse = {
  result: Role[];
  total_roles: number;
};

export function ListRoles(): JSX.Element {
  const [roles, setRoles] = useState<Role[]>([]);
  const [totalRoles, setTotalRoles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    api.get<AxiosResponse>('/roles').then(response => {
      setRoles(response.data.result);
      setTotalRoles(response.data.total_roles);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <Link to="/">
              <FiArrowLeft size={30} />
            </Link>
            <h2>Listagem de Perfis</h2>
          </article>
        </header>

        {loading ? (
          <LoadingTable />
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Perfil</th>
                  <th>Slug</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role._id}>
                    <td>{role._id}</td>
                    <td>{role.title}</td>
                    <td>{role.slug}</td>
                    <td>
                      <div>
                        <Link to={`/roles/${role._id}/details`}>
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
              totalRegister={totalRoles}
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
