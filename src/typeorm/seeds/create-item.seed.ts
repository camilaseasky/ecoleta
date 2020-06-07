import { Factory, Seeder } from "typeorm-seeding"
import Item from "../entities/Item";

export class CreateItem implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Item)().createMany(4);
  }
}