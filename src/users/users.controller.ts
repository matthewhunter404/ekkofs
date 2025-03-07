import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): string {
      return this.usersService.findAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      this.usersService.create(createUserDto);
    }
}
