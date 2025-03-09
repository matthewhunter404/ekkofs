import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { User } from './interfaces/user.interface';
import { EkkoUser } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(EkkoUser)
    private usersRepository: Repository<EkkoUser>,
  ) {}

  async create(user: EkkoUser): Promise<EkkoUser> {

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<EkkoUser[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<EkkoUser | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, user: Partial<EkkoUser>): Promise<EkkoUser| null> {
    const currentUser = await this.usersRepository.findOneBy({ id })
    if (currentUser) {
      currentUser.structure_id = <number>user.structure_id
      //TODO catch error here if structure_id does not exist 
      return await this.usersRepository.save(currentUser)
    } else {
      return null
    }

  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

}