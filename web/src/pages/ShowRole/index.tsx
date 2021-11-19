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

  async function handleEditRole(data: FormData) {
    formRef.current?.setErrors({});
    setLoading(true);

    const schema = Yup.object().shape({
      title: Yup.string().required('O título é obrigatório'),
      slug: Yup.string().required('O slug é obrigatório'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (!data.permissions.length) {
        formRef.current?.setErrors({
          permissions: 'Selecione as permissões',
        });
        return;
      }

      const { title, permissions: dataPermissions, slug } = data;

      await api.put(`/roles/${params.role_id}`, {
        title,
        slug,
        permissions: dataPermissions,
      });

      addToast({ description: 'Perfil editado com sucesso', type: 'success' });
      setLoading(false);
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
    api
      .get<AxiosResponse>('/permissions')
      .then(response => {
        const options = response.data.result.map(option => ({
          label: option.title,
          value: option._id,
        }));

        setPermissions(options);
      })
      .catch((error: AxiosError) => {
        addToast({ type: 'error', description: error.response.data.error });
      });
  }, [addToast]);

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
        <Form ref={formRef} onSubmit={handleEditRole}>
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
