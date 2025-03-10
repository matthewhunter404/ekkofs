import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/typeorm.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { StructuresModule } from './structures/structures.module';
import { RolesModule } from './roles/roles.module';

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
   StructuresModule,
   RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
