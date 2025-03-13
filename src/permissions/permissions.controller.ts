import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionDto } from './dto/permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PermissionDto> {
    const foundPermission = await this.permissionsService.findOne(id);
    if (foundPermission == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return PermissionDto.fromEntity(foundPermission);
    }
  }

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionDto> {
    const createdPermission = await this.permissionsService.create(
      createPermissionDto.toEntity(),
    );

    return PermissionDto.fromEntity(createdPermission);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.permissionsService.remove(id);
  }
}
