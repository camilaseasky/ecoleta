import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import IPointsRepository from '../repositories/IPointsRepository';
import IItemsRepository from '../repositories/IItemsRepository';
import Point from '../typeorm/entities/Point';
import AppError from '../errors/AppError';

@injectable()
class DeletePointService {
  constructor(
      @inject('PointsRepository')
      private pointsRepository: IPointsRepository,

    ) {}

  public async execute(point_id: string): Promise<void> {

      const point = await this.pointsRepository.findById(point_id);
      
      if(!point){
        throw new Error('Point not found')
      }

      //verifica se tem arquivo
      if(point.image){
        const pointImageFilePath = path.join(uploadConfig.directory, point.image);
        const pointImageFileExists = await fs.promises.stat(pointImageFilePath);
  
        if(pointImageFileExists) {
          await fs.promises.unlink(pointImageFilePath);
        }
      }

      await this.pointsRepository.deletePoint(point);
      
        
  }
}

export default DeletePointService;