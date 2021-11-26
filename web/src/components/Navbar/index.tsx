// import { useEffect, useState } from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';

// import Switch from 'react-switch';

import { useAuth } from '../../hooks/auth';
// import { useTheme } from '../../hooks/theme';

import styles from './styles.module.scss';

export function Navbar(): JSX.Element {
  const { user, singOut } = useAuth();
  // const { activeTheme, changeTheme } = useTheme();

  // const [switchChecked, setSwitchChecked] = useState(false);
  // const [switchBackgroudColor, setSwitchBackgroudColor] = useState('');

  // function handleChangeCustomTheme() {
  //   changeTheme(activeTheme === 'light' ? 'dark' : 'light');
  //   setSwitchBackgroudColor('#FFC312');
  //   setSwitchChecked(!switchChecked);
  // }

  // useEffect(() => {
  //   setSwitchBackgroudColor('#353646');
  //   setSwitchChecked(activeTheme === 'dark');
  // }, [activeTheme]);

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
