import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Structure } from './entity/structure.entity';

@Injectable()
export class StructuresService {
  constructor(
    @InjectRepository(Structure)
    private structuresRepository: Repository<Structure>,
  ) {}

  async create(structure: Structure): Promise<Structure> {
    let savedStructure
    try {
        savedStructure = await this.structuresRepository.save(structure);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const message = error.message.toLowerCase();
        const detail = error.driverError.detail.toLowerCase();
        if (message.includes("foreign key constraint")) {
            if (detail.includes("roleid") ){
                throw new HttpException('Assigned Role Does Not Exist', HttpStatus.BAD_REQUEST);
            }
            if (detail.includes("parentstructureid") ){
                throw new HttpException('Parent Structure Does Not Exist', HttpStatus.BAD_REQUEST);
            }
          }

          if (message.includes("violates unique constraint")) {
            if (detail.includes("parentstructureid")) {
              throw new HttpException('Duplicate Parent Structure Assignment, each parent structure can only have one child', HttpStatus.BAD_REQUEST);
            }
            if  (detail.includes("name") && detail.includes("already exists")) {
              throw new HttpException('Duplicate Name, a structure with that name already exists', HttpStatus.BAD_REQUEST);
            }
          }
        
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while creating the structure");
    }


    return savedStructure;
  }

  async findAll(): Promise<Structure[]> {
    return this.structuresRepository.find({relations: ["role"]});
  }
  

  async findOne(id: number): Promise<Structure | null> {
    return this.structuresRepository.findOne({ 
      where: { id: id },
      relations: ["role"] 
    });
  }

  async remove(id: number): Promise<void> {
    await this.structuresRepository.delete(id);
  }

}