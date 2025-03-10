import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StructuresController } from './structures.controller';
import { StructuresService } from './structures.service';
import { Structure } from './entity/structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Structure])],
  controllers: [StructuresController],
  providers: [StructuresService]
})
export class StructureModule {}
