import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { EkkoUser } from '../../users/entity/user.entity';
import { Role } from '../../role/entity/role.entity';

@Entity()
export class Structure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parent_id: number;

  @OneToMany(type => EkkoUser, user => user.structure)
  users: EkkoUser[];

  @ManyToOne(type => Role, role => role.structures)
  role: Role

  constructor(partial: Partial<Structure>) {
    Object.assign(this, partial);
  }
}