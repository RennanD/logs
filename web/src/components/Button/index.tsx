import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  children,
  loading = false,
  type,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.container} {...rest} type={type}>
      {!loading ? children : 'Carregando...'}
    </button>
  );
}
