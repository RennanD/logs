import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  FiArrowLeft,
  FiLock,
  FiMail,
  FiSettings,
  FiUser,
} from 'react-icons/fi';

import { Button } from '../../components/Button';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { useToast } from '../../hooks/toast';
import { api, AxiosError } from '../../services/api';

import styles from './styles.module.scss';
import getValidationErros from '../../utils/getValidationErrors';

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

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
};

export function CreateUser(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<RoleProps[]>([]);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  async function handleCreateUser(data: FormData) {
    formRef.current?.setErrors({});
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: Yup.string().min(6, 'A senha precisa de no mínimo 6 digitos'),
      passwordConfirmation: Yup.string().required(
        'A senha confirmação de senha é obrigatória',
      ),
      role: Yup.string().required('O perfil é obrigatório'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.password !== data.passwordConfirmation) {
        formRef.current?.setErrors({
          passwordConfirmation: 'As senhas não conferem',
        });
        return;
      }

      const { email, name, password, role } = data;

      await api.post('/users', {
        email,
        name,
        password,
        role,
      });

      setLoading(false);
      addToast({ description: 'Usáurio criado com sucesso', type: 'success' });
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);
        formRef.current?.setErrors(errors);
        setLoading(false);
        return;
      }

      const err = error as AxiosError;
      setLoading(false);
      addToast({ description: err.response.data.error, type: 'error' });
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
        <Form ref={formRef} onSubmit={handleCreateUser}>
          <section>
            <TextInput
              label="Nome"
              name="name"
              icon={FiUser}
              placeholder="Digite o nome..."
            />

            <TextInput
              label="E-mail"
              name="email"
              icon={FiMail}
              placeholder="Digite o e-mail..."
              type="email"
            />

            <div className={styles.passwordContent}>
              <div>
                <TextInput
                  name="password"
                  label="Senha"
                  icon={FiLock}
                  placeholder="Digite a senha..."
                  type="password"
                />
              </div>
              <div>
                <TextInput
                  label="Confirmação de senha"
                  name="passwordConfirmation"
                  icon={FiLock}
                  placeholder="Confirme senha..."
                  type="password"
                />
              </div>
            </div>

            <SelectInput
              name="role"
              label="Perfil"
              icon={FiSettings}
              options={roles}
            />

            <div className={styles.buttonContainer}>
              <Button loading={loading}>Cadastrar</Button>
            </div>
          </section>
        </Form>
      </main>
    </div>
  );
}
