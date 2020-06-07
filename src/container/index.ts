import { container } from 'tsyringe';

import IItemsRepository from '../repositories/IItemsRepository';
import IPointsRepository from '../repositories/IPointsRepository';
import ItemsRepository from '../typeorm/repositories/ItemsRepository';
import PointsRepository from '../typeorm/repositories/PointsRepository';

container.registerSingleton<IPointsRepository>(
  'PointsRepository', PointsRepository
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository', ItemsRepository
);

