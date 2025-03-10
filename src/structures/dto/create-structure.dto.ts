import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Structure } from '../entity/structure.entity';
import { Role } from '../../roles/entity/role.entity';

export class CreateStructureDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
  @IsNotEmpty()
  @IsNumber()
  parent_id: number;
  
  public toEntity() {
    return new Structure({
      name: this.name,
      parent_structure: new Structure({ id: this.parent_id }),
      role: new Role({ id: this.role_id }),
    });
  }
  
}