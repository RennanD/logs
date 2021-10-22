import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Students } from '../pages/Students';

// import { Container } from './styles';

export function AppRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/students" component={Students} />
    </Switch>
  );
}
