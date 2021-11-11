import 'dotenv/config';

import 'reflect-metadata';

import 'express-async-errors';

import express from 'express';

import cors from 'cors';

import '../mongoose/database';

import '../container';

import { handleException } from './middlewares/handleException';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(handleException);

app.listen(3333, () => {
  console.log('Server runing 🚀');
});
