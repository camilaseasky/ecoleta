import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import routes from './routes';
import  path  from 'path';
import cors from 'cors';


import AppError from './errors/AppError';
import './container/index';
import './typeorm';

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // erro conhecido
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

app.listen(3333, ( ) => {
  return console.log('Server stared on port 3333')
});