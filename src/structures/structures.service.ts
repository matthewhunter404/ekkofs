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
                throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
            }
            if (detail.includes("strucutreid") ){
                throw new HttpException('Parent Structure Not Found', HttpStatus.NOT_FOUND);
            }
        }
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while creating the structure");
    }


    return savedStructure;
  }

  async findAll(): Promise<Structure[]> {
    return this.structuresRepository.find();
  }

  async findOne(id: number): Promise<Structure | null> {
    return this.structuresRepository.findOneBy({ id });
  }

//   async update(id: number, structure: Partial<Structure>): Promise<Structure| null> {
//     const currentStructure = await this.structuresRepository.findOneBy({ id })
//     if (currentStructure) {
//       currentStructure.role.id = <number>structure.role?.id
//       //TODO catch error here if role does not exist 
//       return await this.structuresRepository.save(currentStructure)
//     } else {
//       return null
//     }

//   }

  async remove(id: number): Promise<void> {
    await this.structuresRepository.delete(id);
  }

}