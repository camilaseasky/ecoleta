import { Request, Response } from 'express';
import { getRepository, Repository} from 'typeorm';
import Item from '../typeorm/entities/Item';

export default class ItemsController {

  public async index(request: Request, response: Response): Promise<Response> {
    const itemsRepository = getRepository(Item);
    const items = await itemsRepository.find();

    const serializedItems = items.map( item => {
      return {
        id: item.id,
        title: item.title,
        url_image: `http://localhost:3333/uploads/${item.image}`,
      }
    })

    return response.json(serializedItems);
  }

}
