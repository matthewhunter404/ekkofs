import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { throwError } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
        transform: true,
    }),
);
  const appPort = configService.get('port');
  console.log("appPort: "+appPort)
  await app.listen(appPort);
}
bootstrap();
