import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get()
    async findAll(): Promise<RoleDto[]> {
      return (await this.rolesService.findAll()).map(e =>RoleDto.fromEntity(e));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RoleDto> {
     const foundRole = await this.rolesService.findOne(id)
      if (foundRole == null) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else {
        return RoleDto.fromEntity(foundRole)
      }
    }

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {

      const createdRole = await this.rolesService.create(createRoleDto.toEntity());

      return RoleDto.fromEntity(createdRole)
    }

    // @Patch(':id')
    // async updateTaskStatus(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {

    //   const updatedRole = await this.rolesService.update(id, updateRoleDto.toEntity());
    //   if (updatedRole == null) {
    //     throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    //   } else {
    //     return RoleDto.fromEntity(updatedRole)
    //   }
    // }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return await this.rolesService.remove(id);
    }
}
