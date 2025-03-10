import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { EkkoUser } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(EkkoUser)
    private usersRepository: Repository<EkkoUser>,
  ) {}

  async create(user: EkkoUser): Promise<EkkoUser> {
    let savedUser
    try {
      savedUser = await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const message = error.message.toLowerCase();
        const detail = error.driverError.detail.toLowerCase();
        if (message.includes("foreign key constraint") && detail.includes("structureid") ){
          throw new HttpException('Structure Not Found', HttpStatus.NOT_FOUND);
        }
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while creating the user");
    }


    return savedUser;
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
      currentUser.structure.id = <number>user.structure?.id
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