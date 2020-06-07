import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import  path  from 'path';

import './container/index';
import './typeorm';

const app = express();

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

app.listen(3333, ( ) => {
  return console.log('Server stared on port 3333')
});