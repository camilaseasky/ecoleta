import * as Faker from "faker"
import { define } from "typeorm-seeding"
import Item  from '../entities/Item';

define(Item, (faker: typeof Faker) => {
  const item = new Item();
  const title = `${faker.random.word()}`;
  const image = 'image_fake';

  item.id = faker.random.uuid();
  item.title = `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
  item.image = image;
  return item;
})