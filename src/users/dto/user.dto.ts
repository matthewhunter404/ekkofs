import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';

export class UserDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  structure_id: number;

  public static fromEntity(entity: EkkoUser) {
    const it = new UserDto();
    it.id = entity.id;
    it.name = entity.name;
    it.structure_id = entity.structure.id;
    return it;
  }
  
}