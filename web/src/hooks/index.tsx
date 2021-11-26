import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { CustomThemeProvider } from './theme';
import { ToastProvider } from './toast';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <CustomThemeProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </CustomThemeProvider>
  );
}
