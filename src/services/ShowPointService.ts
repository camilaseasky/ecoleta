import IPointsRepository from '../repositories/IPointsRepository';
import IPointItemsDTO from '../dtos/IPointItemsDTO';
import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';

@injectable()
class ShowPointsService {

  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute(point_id: string): Promise<IPointItemsDTO> {

    const point = this.pointsRepository.showPointItems(point_id);

    if(!point){
      throw new AppError('Point not found');
    }
   
    return point;
  }
}

export default ShowPointsService;
