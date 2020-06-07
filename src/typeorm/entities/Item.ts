import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany } 
from 'typeorm';

@Entity('items')
class Item {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
image: string;

@Column()
title: string;


@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;


}
export default Item;