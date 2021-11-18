import { Switch } from 'react-router-dom';
import { CreateRoles } from '../pages/CreateRoles';
import { CreateUser } from '../pages/CreateUser';
import { Dashboard } from '../pages/Dashboard';
import { ListUsers } from '../pages/ListUsers';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ShowUser } from '../pages/ShowUser';
import { SignIn } from '../pages/SignIn';
import { Students } from '../pages/Students';
import { StudentsLogs } from '../pages/StudentsLogs';

import { CreateRoute as Route } from './Route';

export function AppRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/" exact component={Dashboard} isPrivate />
      <Route
        path="/students"
        exact
        component={Students}
        isPrivate
        permission="list_student_logs"
      />
      <Route
        path="/students/:id/logs"
        component={StudentsLogs}
        isPrivate
        permission="list_student_logs"
      />

      <Route
        path="/users"
        exact
        component={ListUsers}
        isPrivate
        permission="list_users"
      />
      <Route
        path="/users/:user_id/details"
        exact
        component={ShowUser}
        isPrivate
        permission="list_users"
      />
      <Route
        path="/users/create"
        component={CreateUser}
        isPrivate
        permission="create_users"
      />

      <Route
        path="/roles/create"
        component={CreateRoles}
        isPrivate
        permission="create_roles"
      />

      <Route path="*" component={NotFoundPage} isPrivate />
    </Switch>
  );
}
