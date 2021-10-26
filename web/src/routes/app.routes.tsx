import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Students } from '../pages/Students';
import { StudentsLogs } from '../pages/StudentsLogs';

// import { Container } from './styles';

export function AppRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/students" exact component={Students} />
      <Route path="/students/:id/logs" component={StudentsLogs} />
    </Switch>
  );
}
