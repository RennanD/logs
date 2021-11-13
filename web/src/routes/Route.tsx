// import { Container } from './styles';

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { AuthLayout } from '../pages/_layouts/auth';
import { DefaultLayout } from '../pages/_layouts/defautl';

type IPermissions =
  | 'create_users'
  | 'edit_users'
  | 'create_roles'
  | 'edit_roles'
  | 'import_logs'
  | 'list_student_logs'
  | 'list_permissions'
  | 'list_users'
  | 'list_admins_logs'
  | 'list_roles'
  | 'create_permissions'
  | 'edit_permissions';

interface CreateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
  isPrivate?: boolean;
  permission?: IPermissions;
}

export function CreateRoute({
  isPrivate = false,
  component: Component,
  permission,
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
