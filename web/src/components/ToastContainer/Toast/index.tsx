import { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import styles from './styles.module.scss';

import { ToastMessage } from '..';

import { useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

export function Toast({ message }: ToastProps): JSX.Element {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <div className={`${styles.container} ${styles[message.type || 'info']}`}>
      {icons[message.type || 'info']}

      <div>
        <span>{message.description}</span>
      </div>
    </div>
  );
}
