import express from 'express';
import multer from 'multer';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';
import uploadConfig from './config/upload';

const routes = express.Router();

const upload = multer(uploadConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:point_id', pointsController.show);
routes.put('/points/:point_id',upload.single('image'), pointsController.update);
routes.delete('/points/:point_id', pointsController.delete);

export default routes;