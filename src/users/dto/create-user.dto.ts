import { IsString, IsNumber,IsNotEmpty } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';

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
      structure_id: this.structure_id,
    });;
  }
  
}