import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './app.routes';

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
