import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EkkoUser } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EkkoUser])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
