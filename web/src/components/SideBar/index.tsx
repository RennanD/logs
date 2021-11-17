import {
  FiAward,
  FiShield,
  FiSliders,
  FiUserCheck,
  FiUserPlus,
} from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

export function SideBar(): JSX.Element {
  const navigation = [
    {
      title: 'GERAL',
      links: [
        {
          path: '/',
          title: 'Dashboard',
          icon: <RiDashboardLine size={20} />,
          exact: true,
        },
      ],
    },
    {
      title: 'LOGS',
      links: [
        {
          path: '/students',
          title: 'Listar Alunos',
          icon: <FiAward size={20} />,
          exact: false,
        },
        {
          path: '/admins',
          title: 'Listar Admins',
          icon: <FiSliders size={20} />,
          exact: false,
        },
      ],
    },
    {
      title: 'USUÁRIOS',
      links: [
        {
          path: '/users',
          title: 'Listar Usuários',
          icon: <FiUserCheck size={20} />,
          exact: true,
        },
        {
          path: '/users/create',
          title: 'Cadastrar Usuário',
          icon: <FiUserPlus size={20} />,
          exact: false,
        },
      ],
    },
    {
      title: 'PERFIS',
      links: [
        {
          path: '/roles/create',
          title: 'Criar Perfil',
          icon: <FiShield size={20} />,
          exact: true,
        },
      ],
    },
  ];

  return (
    <aside className={styles.container}>
      <Link to="/">
        <h1>
          Log Monitor <span>.</span>
        </h1>
      </Link>

      {navigation.map((navItem, navIndex) => (
        <article key={String(navIndex)}>
          <section>
            <strong>{navItem.title}</strong>
            <ul>
              {navItem.links.map((link, index) => (
                <li key={String(index)}>
                  <NavLink
                    exact={link.exact}
                    activeStyle={{
                      color: '#FFC312',
                    }}
                    to={link.path}
                  >
                    {link.icon}
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </article>
      ))}
    </aside>
  );
}
