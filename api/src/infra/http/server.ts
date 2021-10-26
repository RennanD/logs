import express from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 4000, () => {
  console.log('Server runing 🚀');
});
