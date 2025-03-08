import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): string {
      return "this.usersService.findAll()";
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      let user: User = {
        id:1,
        name: createUserDto.name,
        structure_id:createUserDto.structure_id,
      };
      this.usersService.create(user);
    }
}
