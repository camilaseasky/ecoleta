import Item from '../typeorm/entities/Item';

export default interface IItemsRepository {
  findByIds(idsItems: string[]): Promise<Item[]>
  
}