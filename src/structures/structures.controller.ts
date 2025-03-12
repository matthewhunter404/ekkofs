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
import { StructuresService } from './structures.service';
import { CreateStructureDto } from './dto/create-structure.dto';
import { StructureDto } from './dto/structure.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('structures')
export class StructuresController {
  constructor(private structuresService: StructuresService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<StructureDto[]> {
    return (await this.structuresService.findAll()).map((e) =>
      StructureDto.fromEntity(e),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<StructureDto> {
    const foundStructure = await this.structuresService.findOne(id);
    if (foundStructure == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return StructureDto.fromEntity(foundStructure);
    }
  }

  @Post()
  async create(
    @Body() createStructureDto: CreateStructureDto,
  ): Promise<StructureDto> {
    const createdStructure = await this.structuresService.create(
      createStructureDto.toEntity(),
    );

    return StructureDto.fromEntity(createdStructure);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.structuresService.remove(id);
  }
}
