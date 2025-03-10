import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, Index} from 'typeorm';
import { EkkoUser } from '../../users/entity/user.entity';
import { Role } from '../../roles/entity/role.entity';

@Entity()
export class Structure {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @OneToMany(type => EkkoUser, user => user.structure)
  users: EkkoUser[];

  @ManyToOne(type => Role, role => role.structures)
  role: Role

  @ManyToOne(type => Structure, structure => structure.child_structures, { nullable: true })
  parent_structure: Structure

  @OneToMany(type => Structure, structure => structure.parent_structure)
  child_structures: Structure[]

  constructor(partial: Partial<Structure>) {
    Object.assign(this, partial);
  }
}