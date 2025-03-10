import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { Structure } from '../../structures/entity/structure.entity';

@Entity()
export class EkkoUser { //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @ManyToOne(type => Structure, structure => structure.users)
  structure: Structure

  constructor(partial: Partial<EkkoUser>) {
    Object.assign(this, partial);
  }
}