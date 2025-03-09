import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
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

      let user: EkkoUser = {
        id:0,
        name: createUserDto.name,
        structure_id:createUserDto.structure_id,
      };
      const createdUser = await this.usersService.create(user);

      return { message: 'User added successfully', user: createdUser };
    }
}
