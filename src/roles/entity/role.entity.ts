import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Structure } from '../../structures/entity/structure.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @Column({ nullable: true })
  parentRoleId: number;

  @OneToOne(() => Role, (role) => role.parent_role, { nullable: true })
  @JoinColumn()
  parent_role: Role;

  @OneToMany((type) => Structure, (structure) => structure.role)
  structures: Structure[];

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
