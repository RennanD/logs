import { Switch, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';

// import { Container } from './styles';

export function AuthRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
    </Switch>
  );
}
