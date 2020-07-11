import {Expose} from 'class-transformer';

import uploadConfig from '../../config/upload';

import { Entity, 
        Column, 
        PrimaryGeneratedColumn, 
        CreateDateColumn, 
        UpdateDateColumn,
        OneToMany, 
        ManyToMany,
        JoinTable} 
from 'typeorm';
import Item from './Item';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column({ type: "numeric"})
  latitude: number;

  @Column({ type: "numeric"})
  longitude: number;

  @Column()
  city: string;

  @Column()
  uf: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(type => Item, {
    cascade: true
  })
  @JoinTable({name:'points_items'})
  items : Item[]

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }
    return `${process.env.APP_API_URL}/uploads/${this.image}`;
  }

}

export default Point;