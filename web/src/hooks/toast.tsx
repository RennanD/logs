import {
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';
import { ToastContainer } from '../components/ToastContainer';

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  description: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const handleAddToast = useCallback(
    ({ type, description }: Omit<ToastMessage, 'id'>) => {
      const toast = {
        id: uuidV4(),
        type,
        description,
      };

      setMessages(oldState => [...oldState, toast]);
    },
    [],
  );

  const handleRemoveToast = useCallback((id: string) => {
    setMessages(oldState => oldState.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{ addToast: handleAddToast, removeToast: handleRemoveToast }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be use within ToasProvider');
  }

  return context;
}
