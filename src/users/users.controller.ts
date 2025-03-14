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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from './users.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAccessible(@AuthUser() user: any): Promise<UserDto[]> {

    return (await this.usersService.findAccessible(user.sub)).map((e) =>
          UserDto.fromEntity(e),
        );

  }

  @Get('all')
  async findAll(@AuthUser() user: any): Promise<UserDto[]> {
    return (await this.usersService.findAll()).map((e) =>
          UserDto.fromEntity(e),
        );

  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const foundUser = await this.usersService.findOne(id);
    if (foundUser == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return UserDto.fromEntity(foundUser);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const userEntity = await createUserDto.toEntity();
    const createdUser = await this.usersService.create(userEntity);

    return UserDto.fromEntity(createdUser);
  }

  @Patch(':id')
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const updatedUser = await this.usersService.update(
      id,
      updateUserDto.toEntity(),
    );
    if (updatedUser == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return UserDto.fromEntity(updatedUser);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.usersService.remove(id);
  }
}
