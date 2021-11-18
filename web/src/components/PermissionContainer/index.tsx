import { ReactNode } from 'react';
import { usePermissions } from '../../hooks/permissions';

export type IPermissions =
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

type PermissionContainerProps = {
  children: ReactNode;
  permission: IPermissions;
};

export function PermissionContainer({
  children,
  permission,
}: PermissionContainerProps): JSX.Element | null {
  const userCanSeeComponent = usePermissions(permission);

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
