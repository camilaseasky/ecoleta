import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import IPointsRepository from '../repositories/IPointsRepository';
import IItemsRepository from '../repositories/IItemsRepository';
import Point from '../typeorm/entities/Point';
import AppError from '../errors/AppError';



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
      throw new AppError('Items does not found');
    }

    const point = await this.pointsRepository.findById(id);

    if(!point){
      throw new AppError('Point not found');
    }

    if(point.image && image){
      const pointImageFilePath = path.join(uploadConfig.directory, point.image);
      const pointImageFileExists = await fs.promises.stat(pointImageFilePath);

      if(pointImageFileExists) {
        await fs.promises.unlink(pointImageFilePath);
      }
    }

    if(image){
      point.image = image;
    }
       
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