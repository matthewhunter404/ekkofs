import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role { //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parent_id: number;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}