import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  TreeParent,
  TreeChildren,
  Index,
} from 'typeorm';
import { EkkoUser } from '../../users/entity/user.entity';
import { Role } from '../../roles/entity/role.entity';
import { Permission } from '../../permissions/entity/permission.entity';

@Entity()
@Tree("materialized-path")
export class Structure {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @OneToMany((type) => EkkoUser, (user) => user.structure)
  users: EkkoUser[];

  @ManyToOne((type) => Role, (role) => role.structures)
  role: Role;

  @Column({ nullable: true })
  parentStructureId: number;

  @TreeParent()
  parent_structure: Structure;

  @TreeChildren()
  child_structures: Structure[];

  @OneToMany((type) => Permission, (permission) => permission.structure)
  permissions: Permission[];

  constructor(partial: Partial<Structure>) {
    Object.assign(this, partial);
  }
}
