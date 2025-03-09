import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Structure } from '../../structure/entity/structure.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Role, role => role.parent_role, { nullable: true })
  @JoinColumn()
  parent_role: Role

  @OneToMany(type => Structure, structure => structure.role)
  structures: Structure[];

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}