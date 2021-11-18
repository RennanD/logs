import { useAuth } from './auth';

export function usePermissions(permission: string) {
  const { user } = useAuth();

  if (user.role.permissions.includes(permission) || !permission) {
    return true;
  }

  return false;
}
