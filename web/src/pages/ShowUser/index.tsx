import { useEffect, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowLeft, FiMail, FiSettings, FiUser } from 'react-icons/fi';

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

type AxiosShowUserResponse = {
  result: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};

type RoleProps = {
  label: string;
  value: string;
};

type FormData = {
  name: string;
  email: string;
  role: string;
};

type RouteParams = {
  user_id: string;
};

export function ShowUser(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<RoleProps[]>([]);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const { params } = useRouteMatch<RouteParams>();

  async function handleCreateUser(data: FormData) {
    formRef.current?.setErrors({});
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
      role: Yup.string().required('O perfil é obrigatório'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, role } = data;

      await api.post('/users', {
        name,
        role,
      });

      setLoading(false);
      addToast({ description: 'Usáurio editado com sucesso', type: 'success' });
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

  useEffect(() => {
    api
      .get<AxiosShowUserResponse>(`/users/${params.user_id}`)
      .then(response => {
        formRef.current?.setData(response.data.result);
      });
  }, [params.user_id]);

  function handleGetData() {
    const alldata = formRef.current?.getData();

    console.log({ alldata });
  }

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
        <Form ref={formRef} onSubmit={handleGetData}>
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
            readOnly
            disabled
          />

          <SelectInput
            name="role"
            label="Perfil"
            icon={FiSettings}
            options={roles}
          />

          <div className={styles.buttonContainer}>
            <Button loading={loading}>Cadastrar</Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
