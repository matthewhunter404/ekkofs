import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';
import { StructureDto } from '../../structures/dto/structure.dto';

export class UserDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNotEmpty()
  structure: StructureDto;

  public static fromEntity(entity: EkkoUser) {
    const user = new UserDto();
    user.id = entity.id;
    user.name = entity.name;
    if (entity.structure) {
      user.structure = StructureDto.fromEntity(entity.structure);
    }
    return user;
  }
  
}