import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import styles from './styles.module.scss';

export function Navbar(): JSX.Element {
  const { user, singOut } = useAuth();

  return (
    <nav className={styles.container}>
      <FiMenu size={24} />
      <div>
        <div className={styles.avatarContainer}>
          <img src={user.avatar} alt="" />
        </div>
        <div className={styles.userContainer}>
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </div>
        <button
          type="button"
          onClick={singOut}
          className={styles.signOutButton}
        >
          <FiLogOut size={24} />
        </button>
      </div>
    </nav>
  );
}
