import { ConfigService } from '@nestjs/config';

export const getJwtConstants = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  expirySeconds: configService.get<string>('JWT_EXPIRY_SECONDS'),
});
