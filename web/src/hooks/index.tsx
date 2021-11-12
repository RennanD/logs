import { ReactNode } from 'react';
import { AuthProvider } from './auth';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}
