import { IsString, IsNotEmpty } from 'class-validator';
import { EkkoUser } from './user.entity';

export class UserDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  structure_id: number;

  public static fromEntity(entity: EkkoUser) {
    const it = new UserDto();
    it.id = entity.id;
    it.name = entity.name;
    it.structure_id = entity.structure_id;
    return it;
  }
  
}