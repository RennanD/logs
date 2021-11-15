import { FormEvent, useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiLock,
  FiMail,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { api } from '../../services/api';
import styles from './styles.module.scss';

type AxiosResponse = {
  result: {
    _id: string;
    title: string;
  }[];
};

type RoleProps = {
  label: string;
  value: string;
};

export function CreateUser(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<RoleProps[]>([]);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (password !== passwordConfirmation) {
      alert('As senhas não conferem');
      return;
    }

    try {
      await api.post('/users', {
        email,
        name,
        password,
        role,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    api.get<AxiosResponse>('/roles').then(response => {
      const options = response.data.result.map(option => ({
        label: option.title,
        value: option._id,
      }));

      setRoles(options);
    });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <Link to="/">
              <FiArrowLeft size={30} />
            </Link>
            <h2>Cadastro de usuário</h2>
          </article>
        </header>
        <form onSubmit={handleCreateUser}>
          <section>
            <label htmlFor="">Nome</label>
            <TextInput
              icon={FiUser}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Digite o nome..."
            />

            <label htmlFor="">E-mail</label>
            <TextInput
              icon={FiMail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite o e-mail..."
              type="email"
            />

            <div className={styles.passwordContent}>
              <div>
                <label htmlFor="">Senha</label>
                <TextInput
                  icon={FiLock}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Digite a senha..."
                  type="password"
                />
              </div>
              <div>
                <label htmlFor="">Confirmação de senha</label>
                <TextInput
                  icon={FiLock}
                  value={passwordConfirmation}
                  onChange={e => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirme senha..."
                  type="password"
                />
              </div>
            </div>

            <label htmlFor="">E-mail</label>
            <SelectInput
              icon={FiSettings}
              value={role}
              onChange={e => setRole(e.target.value)}
              options={roles}
            />

            <div className={styles.buttonContainer}>
              <Button loading={loading}>Cadastrar</Button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
