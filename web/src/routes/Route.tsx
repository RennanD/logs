// import { Container } from './styles';

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { AuthLayout } from '../pages/_layouts/auth';
import { DefaultLayout } from '../pages/_layouts/defautl';

interface CreateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
  isPrivate?: boolean;
  permission?: string;
}

export function CreateRoute({
  isPrivate = false,
  component: Component,
  permission = '',
  ...rest
}: CreateRouteProps): JSX.Element {
  const { user } = useAuth();

  const signed = !!user._id;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  if (!!permission && !user.role.permissions.includes(permission)) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
      {...rest}
    />
  );
}
