import { useEffect, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  FiArrowLeft,
  FiEdit,
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
import { PermissionContainer } from '../../components/PermissionContainer';
import { useAuth } from '../../hooks/auth';

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

  const { user, singOut } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const { params } = useRouteMatch<RouteParams>();

  async function handleEditUser(data: FormData) {
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

      await api.put(`/users/${params.user_id}`, {
        name,
        role,
      });

      setLoading(false);
      if (params.user_id === user._id && role) {
        singOut();
      }
      addToast({ description: 'Usáurio editado com sucesso', type: 'success' });
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

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <Link to="/users">
              <FiArrowLeft size={30} />
            </Link>
            <h2>Detalhes do usuário</h2>
          </article>
        </header>
        <Form ref={formRef} onSubmit={handleEditUser}>
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

          <PermissionContainer permission="edit_users">
            <div className={styles.buttonContainer}>
              <Button icon={FiEdit} loading={loading}>
                Editar
              </Button>
            </div>
          </PermissionContainer>
        </Form>
      </main>
    </div>
  );
}
