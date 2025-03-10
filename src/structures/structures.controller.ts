import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { StructuresService } from './structures.service';
import { CreateStructureDto } from './dto/create-structure.dto';
import { StructureDto } from './dto/structure.dto';

@Controller('structure')
export class StructuresController {
    constructor(private structuresService: StructuresService) {}

    @Get()
    async findAll(): Promise<StructureDto[]> {
      return (await this.structuresService.findAll()).map(e =>StructureDto.fromEntity(e));
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<StructureDto[]> {
      return (await this.structuresService.findAll()).map(e =>StructureDto.fromEntity(e));
    }

    @Post()
    async create(@Body() createStructureDto: CreateStructureDto): Promise<StructureDto> {

      const createdStructure = await this.structuresService.create(createStructureDto.toEntity());

      return StructureDto.fromEntity(createdStructure)
    }

    // @Patch(':id')
    // async updateTaskStatus(@Param('id') id: number, @Body() updateStructureDto: UpdateStructureDto): Promise<StructureDto> {

    //   const updatedStructure = await this.structuresService.update(id, updateStructureDto.toEntity());
    //   if (updatedStructure == null) {
    //     throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    //   } else {
    //     return StructureDto.fromEntity(updatedStructure)
    //   }
    // }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return await this.structuresService.remove(id);
    }
}
