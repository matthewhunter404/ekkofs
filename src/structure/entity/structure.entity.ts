import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from '../../users/entity/users.entity';

@Entity()
export class Structure { //TODO or maybe just call it UserEntity
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role_id: number;

  @Column()
  parent_id: number;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  constructor(partial: Partial<Structure>) {
    Object.assign(this, partial);
  }
}