import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StructureController } from './structures.controller';
import { StructureService } from './structures.service';
import { Structure } from './entity/structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Structure])],
  controllers: [StructureController],
  providers: [StructureService]
})
export class StructureModule {}
