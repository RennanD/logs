import styles from './styles.module.scss';

import heroImage from '../../assets/logs.svg';
import usersImage from '../../assets/users.svg';
import studentsImage from '../../assets/students.svg';
import adminsImage from '../../assets/admins.svg';

export function Dashboard(): JSX.Element {
  return (
    <div className={styles.container}>
      <header className={styles.heahderContent}>
        <div>
          <strong>Olá, Rennan Oliveira!</strong>
          <span>
            Bem vindo ao módulo de logs do sistema! <br />
            Aqui você poderá monitorar de forma rápida e fácil os acessos de
            alunos e gestores no Keep Edu.
          </span>
        </div>

        <img src={heroImage} alt="Hero Image" />
      </header>

      <main className={styles.mainContent}>
        <ul>
          <li>
            <header>
              <img src={usersImage} alt="Usuários" />
            </header>
            <div>
              <strong>Usuários</strong>
              <span>Controle e adicione acessos à plataforma</span>
            </div>
            <footer>
              <button disabled type="button">
                Acessar
              </button>
            </footer>
          </li>

          <li>
            <header>
              <img src={studentsImage} alt="Alunos" />
            </header>
            <div>
              <strong>Alunos</strong>
              <span>Monitorar acesso dos alunos ao sistema</span>
            </div>
            <footer>
              <button type="button">Acessar</button>
            </footer>
          </li>

          <li>
            <header>
              <img src={adminsImage} alt="Alunos" />
            </header>
            <div>
              <strong>Gestores</strong>
              <span>Monitorar acesso dos alunos ao sistema</span>
            </div>
            <footer>
              <button type="button">Acessar</button>
            </footer>
          </li>
        </ul>
      </main>
    </div>
  );
}
