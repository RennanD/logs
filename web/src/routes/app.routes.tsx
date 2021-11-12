import { Switch } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { SignIn } from '../pages/SignIn';
import { Students } from '../pages/Students';
import { StudentsLogs } from '../pages/StudentsLogs';

import { CreateRoute as Route } from './Route';

// import { Container } from './styles';

export function AppRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/" exact component={Dashboard} isPrivate />
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/:id/logs" component={StudentsLogs} isPrivate />
    </Switch>
  );
}
