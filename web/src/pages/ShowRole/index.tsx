import { useEffect, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowLeft, FiCrop, FiEdit, FiShield } from 'react-icons/fi';

import styles from './styles.module.scss';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { api, AxiosError } from '../../services/api';
import { Checkbox } from '../../components/Checkbox';
import { PermissionContainer } from '../../components/PermissionContainer';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

type AxiosResponse = {
  result: {
    _id: string;
    title: string;
  }[];
};

type PermissionProps = {
  _id: string;
};

type AxiosShowUserResponse = {
  result: {
    _id: string;
    title: string;
    slug: string;
    permissions: PermissionProps[];
  };
};

type RoleProps = {
  label: string;
  value: string;
};

type FormData = {
  title: string;
  slug: string;
  permissions: string;
};

type RouteParams = {
  role_id: string;
};

export function ShowRole(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<RoleProps[]>([]);

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

      const { title, permissions: dataPermissions, slug } = data;

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
    api.get<AxiosResponse>('/permissions').then(response => {
      const options = response.data.result.map(option => ({
        label: option.title,
        value: option._id,
      }));

      setPermissions(options);
    });
  }, []);

  useEffect(() => {
    api
      .get<AxiosShowUserResponse>(`/roles/${params.role_id}`)
      .then(response => {
        const rolePermissions = response.data.result.permissions.map(
          permission => permission._id,
        );

        const { slug, title } = response.data.result;

        formRef.current?.setData({ title, slug, permissions: rolePermissions });
      });
  }, [params.role_id]);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <header>
          <article>
            <Link to="/roles">
              <FiArrowLeft size={30} />
            </Link>
            <h2>Detalhes do perfil</h2>
          </article>
        </header>
        <Form ref={formRef} onSubmit={handleEditUser}>
          <TextInput
            label="Titúlo"
            name="title"
            icon={FiShield}
            placeholder="Digite o titúlo do perfil..."
          />

          <TextInput
            label="Slug"
            name="slug"
            icon={FiCrop}
            placeholder="Digite o slug do perfil..."
          />

          <Checkbox
            name="permissions"
            label="Permissões"
            options={permissions}
          />

          <PermissionContainer permission="edit_roles">
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
