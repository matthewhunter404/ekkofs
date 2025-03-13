import { IsNotEmpty } from 'class-validator';
import { Permission } from '../entity/permission.entity';
import { UserDto } from 'src/users/dto/user.dto';
import { StructureDto } from 'src/structures/dto/structure.dto';

export class PermissionDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  user: UserDto;
  @IsNotEmpty()
  structure: StructureDto;

  public static fromEntity(entity: Permission) {
    const permission = new PermissionDto();
    permission.id = entity.id;
    if (entity.user) {
      permission.user = UserDto.fromEntity(entity.user);
    }
    if (entity.structure) {
      permission.structure = StructureDto.fromEntity(entity.structure);
    }
    return permission;
  }
}
