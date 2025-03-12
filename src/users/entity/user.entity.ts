import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Structure } from '../../structures/entity/structure.entity';
import { Permission } from '../../permissions/entity/permission.entity';

@Entity()
export class EkkoUser {
  //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @Column()
  hashedPassword: string;

  @ManyToOne((type) => Structure, (structure) => structure.users)
  structure: Structure;

  @OneToMany((type) => Permission, (permission) => permission.structure)
  permissions: Permission[];

  constructor(partial: Partial<EkkoUser>) {
    Object.assign(this, partial);
  }
}
