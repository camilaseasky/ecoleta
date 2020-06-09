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

}

export default Point;