import Item from "../typeorm/entities/Item";

export default interface ICreateUpdatePointDTO {
  id?: string;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items:  Item[]
}