import { FiMenu, FiPower } from 'react-icons/fi';

import styles from './styles.module.scss';

export function Navbar(): JSX.Element {
  return (
    <nav className={styles.container}>
      <FiMenu size={24} />
      <div>
        <img src="http://github.com/rennand.png" alt="" />
        <span>Rennan Oliveira</span>
        <FiPower size={24} />
      </div>
    </nav>
  );
}
