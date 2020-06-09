import { getRepository, Repository, getConnection } from 'typeorm';
import IPointsRepository from '../../repositories/IPointsRepository';
import ICreateUpdatePointDTO from '../../dtos/ICreateUpdatePointDTO';
import IFindFilterPointsDTO from '../../dtos/IFindFilterPointsDTO';
import IPointItemsDTO from '../../dtos/IPointItemsDTO';
import Point from '../entities/Point';
import AppError from '../../errors/AppError';

class PointsRepository implements IPointsRepository {
  private ormRepository: Repository<Point>;

  constructor() {
    this.ormRepository = getRepository(Point);
  }

  public async create(data: ICreateUpdatePointDTO): Promise<Point> {

    const {name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items} = data;
    
    const point = this.ormRepository.create({
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    })
    
    await this.ormRepository.save(point);

    return point;
  }


  public async save(point: Point): Promise<Point> {
    return await this.ormRepository.save(point)
  }

  public async findFilterPoints(data: IFindFilterPointsDTO): Promise<Point[]>{
    const {uf, city, items} = data; 
    
    const points = await getConnection()
      .getRepository(Point)
      .createQueryBuilder('points')
      .innerJoin('points.items', 'items')
      .where('points.city = :city', {city})
      .andWhere('points.uf = :uf', {uf})
      .andWhere('items.id IN (:...itemsIds)', { itemsIds: items })
      .getMany();     
     
     return points;
  }

  public async findById(point_id: string): Promise<Point | undefined> {
    const point = this.ormRepository.findOne(point_id);

    return point;
  }

  public async showPointItems(point_id: string): Promise<IPointItemsDTO> {
    
    /*
    const point = await getConnection()
      .getRepository(Point)
      .createQueryBuilder('points')
      .innerJoinAndSelect('points.items', 'items')
      .where('points.id = :point_id', { point_id })
      .getOne();
    */

    const point = await this.ormRepository.findOne(point_id, {
      relations: ["items"]
    });

    if(!point){
      throw new AppError('Point not found');
    }
    
    const serializedItems = point.items.map( item => {
      return {
        id: item.id,
        title: item.title,
        url_image: `http://localhost:3333/uploads/${item.image}`,
        }
    })

    delete point.items;
    
    const serializedPoint = {
      point: point,
      items: serializedItems
    }

    return serializedPoint;
  }


  public async deletePoint(point: Point): Promise<void> {
    await this.ormRepository.remove(point);
  }  

  
    
}

export default PointsRepository;
