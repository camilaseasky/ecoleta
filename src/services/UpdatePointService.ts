import { inject, injectable } from 'tsyringe';
import IPointsRepository from '../repositories/IPointsRepository';
import IItemsRepository from '../repositories/IItemsRepository';
import ICreateUpdatePointDTO from '../dtos/ICreateUpdatePointDTO';
import IPointItemsDTO from '../dtos/IPointItemsDTO';
import Point from '../typeorm/entities/Point';


interface IRequest {
  id: string;
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
class UpdatePointService {
  constructor(
      @inject('PointsRepository')
      private pointsRepository: IPointsRepository,

      @inject('ItemsRepository')
      private itemsRepository: IItemsRepository,
    ) {}

  public async execute(data: IRequest): Promise<Point> {

    const { 
      id,
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items} = data;
   
   
    const itemsValidate = await this.itemsRepository.findByIds(items);

    
    if(items.length !== itemsValidate.length){
      throw new Error('Itens não encontrados');
    }

    const point = await this.pointsRepository.findById(id);

    if(!point){
      throw new Error('Point not found');
    }
        
    point.image = image;
    point.name = name;
    point.email = email;
    point.whatsapp = whatsapp;
    point.latitude = latitude;
    point.longitude = longitude;
    point.city = city;
    point.uf = uf;
    point.items = itemsValidate;
   
    return await this.pointsRepository.save(point);
  }
}

export default UpdatePointService;