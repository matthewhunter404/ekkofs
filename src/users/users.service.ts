import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { EkkoUser } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

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
          throw new HttpException('Structure Not Found', HttpStatus.BAD_REQUEST);
        }
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while creating the user");
    }


    return savedUser;
  }

  async findAll(): Promise<EkkoUser[]> {
    return this.usersRepository.find({relations: ["structure"]});
  }

  async findOne(id: number): Promise<EkkoUser | null> {
    return this.usersRepository.findOne({ 
      where: { id: id },
      relations: ["structure"] 
    });
  }

  async findOneByName(username: string): Promise<EkkoUser | null> {
    return this.usersRepository.findOne({ 
      where: { name: username },
      relations: ["permissions"] 
    });
  }

  async update(id: number, user: Partial<EkkoUser>): Promise<EkkoUser| null> {

    let currentUser = await this.usersRepository.findOne({ 
      where: { id: id },
      relations: ["structure"] 
    });
    if (currentUser) {
      currentUser.structure.id = <number>user.structure?.id //Validated at DTO input
      let updatedUser
      try {
        updatedUser = await this.usersRepository.save(currentUser)
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const message = error.message.toLowerCase();
          const detail = error.driverError.detail.toLowerCase();
          if (message.includes("foreign key constraint") && detail.includes("structureid") ){
            throw new HttpException('Assigned Structure Does Not Exist', HttpStatus.BAD_REQUEST);
          }
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred while updating the user");
      }

      return await this.usersRepository.findOne({ 
        where: { id: id },
        relations: ["structure"] 
      });
    } else {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

}