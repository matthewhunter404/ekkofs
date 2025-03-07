import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'

export default (configService: ConfigService): TypeOrmModuleOptions => {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: configService.get('database.host'),
      port: +configService.get('database.port'),
      username: configService.get('database.user'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      entities: [/** entities here **/],
      synchronize: false,
    };
    return options;
  };