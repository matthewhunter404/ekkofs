import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Structure } from '../../structure/entity/structure.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parent_id: number;

  @OneToMany(type => Structure, structure => structure.role)
  structures: Structure[];

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}