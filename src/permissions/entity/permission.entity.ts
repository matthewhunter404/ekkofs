import { Entity, Unique, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Structure } from '../../structures/entity/structure.entity';
import { EkkoUser } from '../../users/entity/user.entity';

@Entity()
@Unique(["structure", "user"])
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Structure, structure => structure.permissions)
  structure: Structure

  @ManyToOne(type => EkkoUser, user => user.permissions)
  user: EkkoUser

  constructor(partial: Partial<Permission>) {
    Object.assign(this, partial);
  }
}