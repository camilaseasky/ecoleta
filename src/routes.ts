import express from 'express';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = express.Router();

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index);
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:point_id', pointsController.show);
routes.put('/points/:point_id', pointsController.update);

export default routes;