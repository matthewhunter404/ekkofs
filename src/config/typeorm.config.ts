import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EkkoUser } from '../users/entity/user.entity';
import { Structure } from '../structures/entity/structure.entity';
import { Role } from '../roles/entity/role.entity';
import { Permission } from '../permissions/entity/permission.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    entities: [EkkoUser, Structure, Role, Permission],
    synchronize: true, //This autoruns migrations, TODO turn off for production
    logging: true
  };
  return options;
};
