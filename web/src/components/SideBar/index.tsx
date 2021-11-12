import { FiAward, FiSliders } from 'react-icons/fi';
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
          icon: <RiDashboardLine />,
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
          icon: <FiAward />,
          exact: false,
        },
        {
          path: '/admins',
          title: 'Listar Admins',
          icon: <FiSliders />,
          exact: false,
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

      {navigation.map(navItem => (
        <>
          <section key={navItem.title}>
            <strong>{navItem.title}</strong>
            <ul>
              {navItem.links.map(link => (
                <li key={link.path}>
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
        </>
      ))}
    </aside>
  );
}
