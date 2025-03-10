import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/typeorm.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { StructureModule } from './structures/structure.module';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeORMConfig,
   }),
    StructureModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
