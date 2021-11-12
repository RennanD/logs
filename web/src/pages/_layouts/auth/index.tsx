// import { Container } from './styles';

import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return <div>{children}</div>;
}
