import { Switch } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { ListUsers } from '../pages/ListUsers';
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
        component={ListUsers}
        isPrivate
        permission="list_users"
      />
    </Switch>
  );
}
