import { useTransition, animated } from 'react-spring';

import styles from './styles.module.scss';
import { Toast } from './Toast';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  description: string;
}

interface ToastConatinerProps {
  messages: ToastMessage[];
}

export function ToastContainer({ messages }: ToastConatinerProps): JSX.Element {
  const messagesWithTransitions = useTransition(messages, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
  });

  return (
    <div className={styles.container}>
      {messagesWithTransitions(({ opacity }, item) => (
        <animated.div
          style={{
            opacity,
          }}
          key={item.id}
        >
          <Toast message={item} />
        </animated.div>
      ))}
    </div>
  );
}
