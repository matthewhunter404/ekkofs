import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Structure } from '../entity/structure.entity';
import { RoleDto } from '../../roles/dto/role.dto';

export class StructureDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  role: RoleDto;
  @IsNotEmpty()
  @IsNumber()
  parent_id: number;
  public static fromEntity(entity: Structure) {
    console.log("Structure Entity:", entity);
    const structure = new StructureDto();
    structure.id = entity.id;
    structure.name = entity.name;
    if (entity.role) {
      structure.role = RoleDto.fromEntity(entity.role);
    }
    if (entity.parentStructureId) {
      structure.parent_id = entity.parentStructureId;
    }
    return structure;
  }
  
}