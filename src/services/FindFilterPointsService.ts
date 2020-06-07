import IPointsRepository from '../repositories/IPointsRepository';
import IFindFilterPointsDTO from '../dtos/IFindFilterPointsDTO';
import IItemsRepository from '../repositories/IItemsRepository';

import Point from '../typeorm/entities/Point';
import { injectable, inject } from 'tsyringe';

@injectable()
class FindFilterPointsService {
  
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute(data: IFindFilterPointsDTO): Promise<Point[]> {

    const {items } = data;
    
    const itemsValidate = await this.itemsRepository.findByIds(items);

    if(items.length !== itemsValidate.length){
      throw new Error('Itens não encontrados');
    }

    const points = this.pointsRepository.findFilterPoints(data);
   
    return points;
  }
}

export default FindFilterPointsService;
