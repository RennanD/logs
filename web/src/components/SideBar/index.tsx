import {
  FiAward,
  FiShield,
  FiSliders,
  FiUserCheck,
  FiUserPlus,
} from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { IPermissions, PermissionContainer } from '../PermissionContainer';

import styles from './styles.module.scss';

export function SideBar(): JSX.Element {
  const { user } = useAuth();

  function userCanSeeList(permissions: string[]) {
    return permissions.some(permission =>
      user.role.permissions.includes(permission),
    );
  }

  const navigation = [
    {
      title: 'GERAL',
      permissions: [],
      links: [
        {
          path: '/',
          title: 'Dashboard',
          icon: <RiDashboardLine size={20} />,
          exact: true,
          permission: false,
        },
      ],
    },
    {
      title: 'LOGS',
      permissions: ['list_student_logs', 'list_admins_logs'],
      links: [
        {
          path: '/students',
          title: 'Listar Alunos',
          icon: <FiAward size={20} />,
          exact: false,

          permission: 'list_student_logs',
        },
        {
          path: '/admins',
          title: 'Listar Admins',
          icon: <FiSliders size={20} />,
          exact: false,
          permission: 'list_admins_logs',
        },
      ],
    },
    {
      title: 'USUÁRIOS',
      permissions: ['list_users', 'create_users'],
      links: [
        {
          path: '/users',
          title: 'Listar Usuários',
          icon: <FiUserCheck size={20} />,
          exact: true,
          permission: 'list_users',
        },
        {
          path: '/users/create',
          title: 'Cadastrar Usuário',
          icon: <FiUserPlus size={20} />,
          exact: false,
          permission: 'create_users',
        },
      ],
    },
    {
      title: 'PERFIS',
      permissions: ['create_roles'],
      links: [
        {
          path: '/roles/create',
          title: 'Criar Perfil',
          icon: <FiShield size={20} />,
          exact: true,
          permission: 'create_roles',
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
        <>
          {(!navItem.permissions.length ||
            userCanSeeList(navItem.permissions)) && (
            <article key={String(navIndex)}>
              <section>
                <strong>{navItem.title}</strong>
                <ul>
                  {navItem.links.map((link, index) => (
                    <PermissionContainer
                      key={String(index)}
                      permission={link.permission as IPermissions}
                    >
                      <li>
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
                    </PermissionContainer>
                  ))}
                </ul>
              </section>
            </article>
          )}
        </>
      ))}
    </aside>
  );
}
