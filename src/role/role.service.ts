import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(role: Role): Promise<Role> {
    let savedRole
    try {
        savedRole = await this.rolesRepository.save(role);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const message = error.message.toLowerCase();
        const detail = error.driverError.detail.toLowerCase();
        if (message.includes("foreign key constraint") && detail.includes("roleid") ){
          throw new HttpException('Parent Role Not Found', HttpStatus.NOT_FOUND);
        }
      }
      throw new Error("An unexpected error occurred while creating the role");
    }


    return savedRole;
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id });
  }

//   async update(id: number, role: Partial<Role>): Promise<Role| null> {
//     const currentRole = await this.rolesRepository.findOneBy({ id })
//     if (currentRole) {
//       currentRole.role.id = <number>role.role?.id
//       //TODO catch error here if role does not exist 
//       return await this.rolesRepository.save(currentRole)
//     } else {
//       return null
//     }

//   }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }

}