import Point from '../typeorm/entities/Point';
import ICreateUpdatePointDTO from '../dtos/ICreateUpdatePointDTO';
import IFindFilterPointsDTO from '../dtos/IFindFilterPointsDTO';
import IPointItemsDTO from '../dtos/IPointItemsDTO';

export default interface IPointsRepository {
  create(data: ICreateUpdatePointDTO): Promise<Point>
  save(point: Point): Promise<Point>;
  findFilterPoints(data: IFindFilterPointsDTO): Promise<Point[]>;
  findById(point_id: string): Promise<Point | undefined>;
  showPointItems(point_id: string): Promise<IPointItemsDTO>;
  
}