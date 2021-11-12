// import { Container } from './styles';

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthLayout } from '../pages/_layouts/auth';
import { DefaultLayout } from '../pages/_layouts/defautl';

interface CreateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
  isPrivate?: boolean;
}

export function CreateRoute({
  isPrivate = false,
  component: Component,
  ...rest
}: CreateRouteProps): JSX.Element {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
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
