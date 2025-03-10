import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Role } from '../entity/role.entity';

export class RoleDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  parent_id: number;
  public static fromEntity(entity: Role) {
    const it = new RoleDto();
    it.id = entity.id;
    it.name = entity.name;
    it.parent_id = entity.parent_role.id;
    return it;
  }
  
}