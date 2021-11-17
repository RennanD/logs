import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowLeft, FiCrop, FiShield } from 'react-icons/fi';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useToast } from '../../hooks/toast';
import { api, AxiosError } from '../../services/api';

import styles from './styles.module.scss';
import getValidationErros from '../../utils/getValidationErrors';
import { Checkbox } from '../../components/Checkbox';

type AxiosResponse = {
  result: {
    _id: string;
    title: string;
  }[];
};

type PermissionProps = {
  label: string;
  value: string;
};

type FormData = {
  title: string;
  slug: string;
  permissions: string[];
};

export function CreateRoles(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<
    PermissionProps[]
  >([]);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  async function handleCreateUser(data: FormData) {
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

      const { slug, permissions, title } = data;

      await api.post('/roles', {
        title,
        slug,
        permissions,
      });

      setLoading(false);
      addToast({ description: 'Perfil criado com sucesso', type: 'success' });
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
    api.get<AxiosResponse>('/permissions').then(response => {
      const options = response.data.result.map(option => ({
        label: option.title,
        value: option._id,
      }));

      setSelectedPermissions(options);
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
            <h2>Cadastro de Perfil</h2>
          </article>
        </header>
        <Form ref={formRef} onSubmit={handleCreateUser}>
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
            options={selectedPermissions}
          />
          <div className={styles.buttonContainer}>
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
