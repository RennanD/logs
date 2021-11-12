import { FormEvent, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import styles from './styles.module.scss';

import { api } from '../../services/api';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.animationContainer}>
          <form onSubmit={handleLogin}>
            <h1>
              Entrar <span>.</span>
            </h1>
            <span>Faça logins para acessar os logs</span>
            <section>
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
            </section>

            <Button loading={loading}>Entrar</Button>
          </form>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  );
}
