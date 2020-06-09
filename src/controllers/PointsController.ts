import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import CreatePointService from '../services/CreatePointService';
import UpdatePointService from '../services/UpdatePointService';
import FindFilterPointsService from '../services/FindFilterPointsService';
import ShowPointService from '../services/ShowPointService';
import DeletePointService from '../services/DeletePointService';
import Point from '../typeorm/entities/Point';

export default class PointsController {

  
  public async create(request: Request, response: Response): Promise<Response> {
      
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: stringItems,
    } = request.body;

    const items = stringItems.split(',').map((item: string) => item.trim());
    
    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({
      image: request.file?.filename || '',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    });
    
    return response.json(point);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    
    const {items } = request.query;
    const uf = String(request.query.uf);
    const city = String(request.query.city);

    const itemsParsed = String(items)
          .split(',')
          .map(item => item.trim());

    const findFilterPoints = container.resolve(FindFilterPointsService);

    const points = await findFilterPoints.execute({
      uf,
      city,
      items: itemsParsed
    });

    return response.json(points);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    
    try {
      const {point_id} = request.params;

      const showPoint = container.resolve(ShowPointService);
      
      const point = await showPoint.execute(point_id);

      return response.json(point);
    }  
    catch (err) {
      return response.status(400).json({ error: err.message });
    }
      
  }

  public async update(request: Request, response: Response): Promise<Response> {
    
    const {point_id} = request.params;

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: stringItems,
    } = request.body;

    const items = stringItems.split(',').map((item: string) => item.trim());

    const updatePoint = container.resolve(UpdatePointService);
   
    
    
    const point = await updatePoint.execute({
      id: point_id,
      image: request.file?.filename || '',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    });

    return response.json(point);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
      const {point_id} = request.params
      const deletePoint = container.resolve(DeletePointService);
      
      await deletePoint.execute(point_id);

      return response.status(204).json({});

  }

}
