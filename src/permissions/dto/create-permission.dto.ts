import { IsNumber, IsNotEmpty } from 'class-validator';
import { Permission } from '../entity/permission.entity';
import { Structure } from '../../structures/entity/structure.entity';
import { EkkoUser } from '../../users/entity/user.entity';

export class CreatePermissionDto {
  @IsNumber()
  @IsNotEmpty()
  structure_id: number;
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  public toEntity() {
    const newEntity = new Permission({
      user: new EkkoUser({
        id: this.user_id,
      }),
      structure: new Structure({
        id: this.structure_id,
      }),
    });
    return newEntity;
  }
}
