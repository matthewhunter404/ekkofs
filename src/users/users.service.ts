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

  async create(user: EkkoUser) {
    console.log("user"+ JSON.stringify(user))
    return await this.usersRepository.insert(user);
  }

  findAll(): Promise<EkkoUser[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<EkkoUser | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}