import { inject, injectable } from 'tsyringe';
import IPointsRepository from '../repositories/IPointsRepository';
import IItemsRepository from '../repositories/IItemsRepository';
import ICreateUpdatePointDTO from '../dtos/ICreateUpdatePointDTO';
import Point from '../typeorm/entities/Point';

interface IRequestPoint {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: string[];
}

@injectable()
class CreatePointService {
  constructor(
      @inject('PointsRepository')
      private pointsRepository: IPointsRepository,

      @inject('ItemsRepository')
      private itemsRepository: IItemsRepository,
    ) {}

  public async execute(data: IRequestPoint): Promise<Point> {
    const { image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf} = data;

    const {items} = data;

    
    
    const itemsValidate = await this.itemsRepository.findByIds(items);

    
    if(items.length !== itemsValidate.length){
      throw new Error('Itens não encontrados');
    }
    
        
    const point = await this.pointsRepository.create(
      {
        image,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items: itemsValidate,
      }
    );

    return point;
  }
}

export default CreatePointService;
