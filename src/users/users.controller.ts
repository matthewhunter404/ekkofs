import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserDto[]> {
      return (await this.usersService.findAll()).map(e =>UserDto.fromEntity(e));
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDto[]> {
      return (await this.usersService.findAll()).map(e =>UserDto.fromEntity(e));
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {

      const createdUser = await this.usersService.create(createUserDto.toEntity());

      return UserDto.fromEntity(createdUser)
    }

    @Patch(':id')
    async updateTaskStatus(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {

      const updatedUser = await this.usersService.update(id, updateUserDto.toEntity());
      if (updatedUser == null) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else {
        return UserDto.fromEntity(updatedUser)
      }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return await this.usersService.remove(id);
    }
}
