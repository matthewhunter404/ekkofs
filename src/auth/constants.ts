import { ConfigService } from '@nestjs/config';

export const getJwtConstants = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  expirySeconds: configService.get<number>('JWT_EXPIRY_SECONDS'),
});
