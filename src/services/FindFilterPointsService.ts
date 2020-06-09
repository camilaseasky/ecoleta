import IPointsRepository from '../repositories/IPointsRepository';
import IItemsRepository from '../repositories/IItemsRepository';

import Point from '../typeorm/entities/Point';
import { injectable, inject } from 'tsyringe';
import AppError from '../errors/AppError';

interface IDataFilter {
  city: string;
  uf: string;
  items: string[];
}

@injectable()
class FindFilterPointsService {
  
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute(data: IDataFilter): Promise<Point[]> {

    const {city, uf, items } = data;
    
    const itemsValidate = await this.itemsRepository.findByIds(items);

    if(items.length !== itemsValidate.length){
      throw new AppError('Itens não encontrados');
    }

    const points = this.pointsRepository.findFilterPoints({city, uf, items});
   
    return points;
  }
}

export default FindFilterPointsService;
