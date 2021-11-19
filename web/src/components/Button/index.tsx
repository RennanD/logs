import { ButtonHTMLAttributes, ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: ComponentType<IconBaseProps>;
}

export function Button({
  children,
  loading = false,
  type,
  icon: Icon,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.container} {...rest} type={type}>
      {!loading ? (
        <div>
          {Icon && <Icon size={24} />}
          {children}
        </div>
      ) : (
        <div className={styles.loader} />
      )}
    </button>
  );
}
