import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EkkoUser { //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  structure_id: number;

  constructor(partial: Partial<EkkoUser>) {
    Object.assign(this, partial);
  }
}