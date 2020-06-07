import Point from '../typeorm/entities/Point';

interface IItem {
  id: string;
  title: string; 
}

export default interface IPointItems {
  point: Point;
  items: IItem[];
}