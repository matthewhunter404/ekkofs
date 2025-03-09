import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Structure } from '../entity/structure.entity';

export class CreateStructureDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
  @IsNotEmpty()
  @IsNumber()
  parent_id: number;
    public toEntity() {
      return new Structure({
        name: this.name,
        role_id: this.role_id,
        parent_id: this.parent_id,
      });;
    }
  
}