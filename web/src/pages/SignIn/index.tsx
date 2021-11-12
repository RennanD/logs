import { FormEvent, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import styles from './styles.module.scss';

import loginImage from '../../assets/login3.svg';
import { api } from '../../services/api';
import { TextInput } from '../../components/TextInput';

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();

    const response = await api.post('/sessions', {
      email,
      password,
    });

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.animationContainer}>
          <h1>Entrar</h1>
          <span>Faça logins para acessar os logs</span>
          <form>
            <TextInput
              icon={FiMail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite seu email..."
            />

            <TextInput
              icon={FiLock}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              type="password"
            />
          </form>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  );
}
