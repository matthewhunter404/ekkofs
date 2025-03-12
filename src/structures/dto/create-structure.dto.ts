import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Structure } from '../entity/structure.entity';
import { Role } from '../../roles/entity/role.entity';

export class CreateStructureDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
  @IsNumber()
  @IsOptional()
  parent_id: number | null;

  public toEntity() {
    const newStructure = new Structure({
      name: this.name,
      role: new Role({
        id: this.role_id,
      }),
    });
    if (this.parent_id) {
      newStructure.parent_structure = new Structure({ id: this.parent_id });
    }
    return newStructure;
  }
}
