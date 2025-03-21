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
    const role = new RoleDto();
    role.id = entity.id;
    role.name = entity.name;
    if (entity.parentRoleId) {
      role.parent_id = entity.parentRoleId;
    }

    return role;
  }
}
