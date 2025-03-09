import { IsNotEmpty, IsNumber } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  structure_id: number;

  public toEntity() {
    return new EkkoUser({
      structure_id: this.structure_id,
    });;
  }
  
}