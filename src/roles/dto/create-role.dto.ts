import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../entity/role.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsOptional()
  parent_id: number | null;
  public toEntity() {
    let newEntity = new Role({
      name: this.name,
    });
    if (this.parent_id) {
      newEntity.parent_role = new Role({ id: this.parent_id })
    }
    return newEntity;
  }
  
}