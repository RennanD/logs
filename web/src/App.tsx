import { BrowserRouter } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import { Routes } from './routes';

import styles from './styles/app.module.scss';

export function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <SideBar />
        <main>
          <Routes />
        </main>
      </div>
    </BrowserRouter>
  );
}
