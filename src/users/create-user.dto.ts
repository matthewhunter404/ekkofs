import { IsString, IsNotEmpty } from 'class-validator';
import { EkkoUser } from './user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  structure_id: number;

  public toEntity() {
    return new EkkoUser({
      name: this.name,
      structure_id: this.structure_id,
    });;
  }
  
}