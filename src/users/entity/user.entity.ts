import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Structure } from '../../structure/entity/structure.entity';

@Entity()
export class EkkoUser { //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @ManyToOne(type => Structure, structure => structure.users)
  structure: Structure

  constructor(partial: Partial<EkkoUser>) {
    Object.assign(this, partial);
  }
}