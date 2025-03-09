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
    const it = new StructureDto();
    it.id = entity.id;
    it.name = entity.name;
    it.role_id = entity.role_id;
    it.parent_id = entity.parent_id;
    return it;
  }
  
}