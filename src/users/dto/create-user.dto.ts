import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { EkkoUser } from '../entity/user.entity';
import { Structure } from '../../structures/entity/structure.entity';
import * as bcrypt from 'bcrypt';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  structure_id: number;

  @IsString()
  @IsNotEmpty()
  password;

  public async toEntity() {
    const salt = await bcrypt.genSalt();
    const hashedPAssword = await bcrypt.hash(this.password, salt);
    return new EkkoUser({
      name: this.name,
      structure: new Structure({ id: this.structure_id }),
      hashedPassword: hashedPAssword,
    });
  }
}
