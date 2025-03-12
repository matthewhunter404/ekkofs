import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StructuresController } from './structures.controller';
import { StructuresService } from './structures.service';
import { Structure } from './entity/structure.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule, TypeOrmModule.forFeature([Structure])],
  controllers: [StructuresController],
  providers: [StructuresService],
})
export class StructuresModule {}
