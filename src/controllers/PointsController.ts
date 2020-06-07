import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePointService from '../services/CreatePointService';
import UpdatePointService from '../services/UpdatePointService';
import ICreateUpdatePointDTO from '../dtos/ICreateUpdatePointDTO';
import FindFilterPointsService from '../services/FindFilterPointsService';
import ShowPointService from '../services/ShowPointService';


export default class PointsController {

  
  public async create(request: Request, response: Response): Promise<Response> {
        
    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    }: ICreateUpdatePointDTO = request.body;

    
    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({
      image,
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
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const updatePoint = container.resolve(UpdatePointService);

    const point = await updatePoint.execute({
      id: point_id,
      image,
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
  
}
