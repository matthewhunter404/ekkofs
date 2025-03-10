import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Role } from '../entity/role.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  parent_id: number;
  public toEntity() {
    return new Role({
      name: this.name,
      parent_role: new Role({ id: this.parent_id }),
    });;
  }
  
}