import { FiAward, FiSliders, FiUserCheck } from 'react-icons/fi';
import styles from './styles.module.scss';

import heroImage from '../../assets/logs.svg';

import { DashboardCard } from '../../components/DashboardCard';
import { useAuth } from '../../hooks/auth';
import { PermissionContainer } from '../../components/PermissionContainer';

export function Dashboard(): JSX.Element {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.heahderContent}>
        <div>
          <strong>Olá, {user.name}!</strong>
          <span>
            Bem vindo ao módulo de logs do sistema! <br />
            Aqui você poderá monitorar de forma rápida e fácil os acessos ao
            Keep Edu.
          </span>
        </div>

        <img src={heroImage} alt="Hero Image" />
      </header>

      <main className={styles.mainContent}>
        <section>
          <h1>Visão Geral</h1>
          <div>
            <PermissionContainer permission="list_student_logs">
              <DashboardCard
                icon={FiAward}
                title="Alunos"
                link="/students"
                subtitle="Monitore acessos dos alunos ao Keep Edu"
              />
            </PermissionContainer>

            <PermissionContainer permission="list_admins_logs">
              <DashboardCard
                icon={FiSliders}
                title="Gestores"
                link="/admins"
                subtitle="Monitorar acesso dos gestores ao Keep Edu"
              />
            </PermissionContainer>

            <PermissionContainer permission="list_users">
              <DashboardCard
                icon={FiUserCheck}
                title="Usuários"
                link="/users"
                subtitle="Controle e adicione acessos à plataforma"
              />
            </PermissionContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
