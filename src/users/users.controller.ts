import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user.dto';
import { EkkoUser } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): string {
      return "this.usersService.findAll()";
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {

      const createdUser = await this.usersService.create(createUserDto.toEntity());

      return UserDto.fromEntity(createdUser)
    }
}
