import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Permission } from './entity/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(permission: Permission): Promise<Permission> {
    let savedPermission
    try {
        savedPermission = await this.permissionsRepository.save(permission);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const message = error.message.toLowerCase();
        const detail = error.driverError.detail.toLowerCase();
        if (message.includes("foreign key constraint")) {
            if (detail.includes("structureid") && (detail.includes("is not present"))) {
                throw new HttpException('Structure does not exist', HttpStatus.BAD_REQUEST);
            }
            if (detail.includes("userid") && (detail.includes("is not present"))) {
                throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
            }
        }
        if (message.includes("violates unique constraint")) {
          if (detail.includes("structureid") && detail.includes("userid") && detail.includes("already exists")) {
            throw new HttpException('Duplicate Permission Creation, the user already permission on that structure', HttpStatus.BAD_REQUEST);
          }
        }

      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while creating the permission");
    }


    return savedPermission;
  }

  //TODO assess if this makes sense to get all Permissions
  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async findOne(id: number): Promise<Permission | null> {
    return this.permissionsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.permissionsRepository.delete(id);
  }

}