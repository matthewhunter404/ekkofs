import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Structure } from '../entity/structure.entity';

export class StructureDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
  @IsNotEmpty()
  @IsNumber()
  parent_id: number;
  public static fromEntity(entity: Structure) {
    console.log("Expected entity:", entity);
    const structure = new StructureDto();
    structure.id = entity.id;
    structure.name = entity.name;
    structure.role_id = entity.role.id;
    if (entity.parent_structure) {
      structure.parent_id = entity.parent_structure.id;
    }
    return structure;
  }
  
}