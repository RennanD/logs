import { FormEvent, useState } from 'react';
import styles from './styles.module.scss';

import loginImage from '../../assets/login3.svg';
import { api } from '../../services/api';

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
      <main>
        <aside>
          <img src={loginImage} alt="" />
          <h2>
            Realize login na plataforma <br /> para ter acesso os logs
          </h2>
        </aside>
        <form onSubmit={handleLogin}>
          <h1>
            Log Monitor <span>.</span>
          </h1>

          <section>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              placeholder="Digite seu e-mail..."
            />
          </section>

          <section>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha..."
            />
          </section>

          <button type="submit">
            {loading ? <div className={styles.blob} /> : <span>Entrar</span>}
          </button>
        </form>
      </main>
    </div>
  );
}
