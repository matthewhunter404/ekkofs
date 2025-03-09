import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'
import { EkkoUser } from '../users/user.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => {
    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DATABASE'),
      entities: [EkkoUser],
      synchronize: true, //This autoruns migrations, TODO turn off for production
    };
    return options;
  };