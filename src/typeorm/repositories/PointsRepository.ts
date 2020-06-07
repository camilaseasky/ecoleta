import { getRepository, Repository, createQueryBuilder, getConnection, ChildEntity } from 'typeorm';
import IPointsRepository from '../../repositories/IPointsRepository';
import ICreateUpdatePointDTO from '../../dtos/ICreateUpdatePointDTO';
import IFindFilterPointsDTO from '../../dtos/IFindFilterPointsDTO';
import IPointItemsDTO from '../../dtos/IPointItemsDTO';
import Point from '../entities/Point';
import IPointItems from '../../dtos/IPointItemsDTO';



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
    const item_id = "19d42961-d01f-4ea7-b841-e65702cedbc6";
    
    const points = await getConnection()
      .getRepository(Point)
      .createQueryBuilder('points')
      .innerJoin('points.points_items', 'points_items')
      .where('points.city = :city', {city})
      .andWhere('points.uf = :uf', {uf})
      .where('points_items.item_id IN (:...itemsIds)', { itemsIds: items })
      .getMany();
         


     return points;
  }


  public async findById(point_id: string): Promise<Point | undefined> {
    const point = this.ormRepository.findOne(point_id);

    return point;
  }

  public async showPointItems(point_id: string): Promise<IPointItemsDTO> {
    
    const point = await getConnection()
      .getRepository(Point)
      .createQueryBuilder('points')
      .innerJoinAndSelect('points.points_items', 'points_items')
      .innerJoinAndSelect('points_items.item', 'items')
      .where('points.id = :point_id', { point_id })
      .getOne();

    if(!point){
      throw new Error('Point not found');
    }
    
    const serializedItems = point.items.map( point_item => {
      return {
        id: point_item.id,
        title: point_item.title,
        url_image: `http://localhost:3333/uploads/${point_item.image}`,
        }
    })

    delete point.items;

    
    const serializedPoint = {
      point: point,
      items: serializedItems
    }

    return serializedPoint;
  }

    
}

export default PointsRepository;
