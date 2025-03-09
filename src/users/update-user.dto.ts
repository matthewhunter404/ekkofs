import { IsNotEmpty } from 'class-validator';
import { EkkoUser } from './user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  structure_id: number;

  public toEntity() {
    return new EkkoUser({
      structure_id: this.structure_id,
    });;
  }
  
}