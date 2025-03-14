import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, In } from 'typeorm';
import { EkkoUser } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(EkkoUser)
    private usersRepository: Repository<EkkoUser>,
  ) {}

  async create(user: EkkoUser): Promise<EkkoUser> {
    let savedUser;
    try {
      savedUser = await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const message = error.message.toLowerCase();
        const detail = error.driverError.detail.toLowerCase();
        if (
          message.includes('foreign key constraint') && detail.includes('structureid')
        ) {
          throw new HttpException(
            'Structure Not Found',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (message.includes('violates unique constraint')) {
          if (detail.includes('name') && detail.includes('already exists')) {
            throw new HttpException(
              'Duplicate Name, a user with this name already exists',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while creating the user');
    }

    return savedUser;
  }

  //TODO remove for all except some super user account
  async findAll(): Promise<EkkoUser[]> {
    return this.usersRepository.find({ relations: ['structure'] });
  }

  async findOne(id: number): Promise<EkkoUser | null> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: ['structure'],
    });
  }

  async findAccessible(userID: number): Promise<EkkoUser[]> {

    const accessibleUsers = await this.usersRepository.query("select DISTINCT ekko_user.id, ekko_user.name from ekko_user "+
      "INNER JOIN structure ON structure.id = ekko_user.\"structureId\" " + 
      "INNER JOIN permission ON structure.mpath LIKE '%' || permission.\"structureId\" || '%'"+
      "INNER JOIN ekko_user AS caller ON permission.\"userId\" = caller.id WHERE caller.id ="+userID)

    console.log("accessibleUsers:", JSON.stringify(accessibleUsers))
    return accessibleUsers

  }

  async findOneByName(username: string): Promise<EkkoUser | null> {
    return this.usersRepository.findOne({
      where: { name: username },
      relations: ['permissions'],
    });
  }

  async update(id: number, user: Partial<EkkoUser>): Promise<EkkoUser | null> {
    const currentUser = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['structure'],
    });
    if (currentUser) {
      currentUser.structure.id = <number>user.structure?.id; //Validated at DTO input
      let updatedUser;
      try {
        updatedUser = await this.usersRepository.save(currentUser);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const message = error.message.toLowerCase();
          const detail = error.driverError.detail.toLowerCase();
          if (
            message.includes('foreign key constraint') &&
            detail.includes('structureid')
          ) {
            throw new HttpException(
              'Assigned Structure Does Not Exist',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred while updating the user');
      }

      return await this.usersRepository.findOne({
        where: { id: id },
        relations: ['structure'],
      });
    } else {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
