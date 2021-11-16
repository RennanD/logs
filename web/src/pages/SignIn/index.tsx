import { useRef, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import styles from './styles.module.scss';

import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';

type ErrorProps = {
  message: string;
};

type FormData = {
  email: string;
  password: string;
};

export function SignIn(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  async function handleLogin(data: FormData) {
    setLoading(true);
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: Yup.string().required('A senha é obrigatória'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);
        formRef.current?.setErrors(errors);
        setLoading(false);
        return;
      }

      const err = error as ErrorProps;

      setLoading(false);
      addToast({ description: err.message, type: 'error' });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.animationContainer}>
          <Form ref={formRef} onSubmit={handleLogin}>
            <h1>
              Entrar <span>.</span>
            </h1>
            <span>Faça login para acessar os logs do sistema</span>
            <section>
              <TextInput
                label="E-mail"
                icon={FiMail}
                name="email"
                placeholder="Digite seu email..."
                type="email"
              />

              <TextInput
                label="Senha"
                name="password"
                icon={FiLock}
                placeholder="Digite sua senha..."
                type="password"
              />
            </section>

            <Button loading={loading}>Entrar</Button>
          </Form>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  );
}
