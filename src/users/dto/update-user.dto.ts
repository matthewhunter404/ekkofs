import { IsNotEmpty, IsNumber } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';
import { Structure } from '../../structures/entity/structure.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  structure_id: number;

  public toEntity() {
    return new EkkoUser({
      structure: new Structure({ id: this.structure_id }),
    });
  }
}
