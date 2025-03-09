import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EkkoUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  structure_id: number;
}