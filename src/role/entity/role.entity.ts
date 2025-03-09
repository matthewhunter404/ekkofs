import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Structure { //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role_id: number;

  @Column()
  parent_id: number;

  constructor(partial: Partial<Structure>) {
    Object.assign(this, partial);
  }
}