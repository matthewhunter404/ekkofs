import { IsString, IsNumber,IsNotEmpty } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';
import { Structure } from '../../structure/entity/structure.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  structure_id: number;

  public toEntity() {
    return new EkkoUser({
      name: this.name,
      structure: new Structure({ id: this.structure_id }),
    });;
  }
  
}