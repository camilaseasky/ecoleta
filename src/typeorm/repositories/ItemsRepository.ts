import { Repository, getRepository, In } from 'typeorm';
import IItemsRepository from '../../repositories/IItemsRepository';
import Item from '../entities/Item';

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async findByIds(idsItems: string[]): Promise<Item[]>{

    const items = await this.ormRepository.find({
      id: In(idsItems)
    });
    
    
    return items;
  }

     
}

export default ItemsRepository;
