import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const PORT = configService.get('PORT');
export const DB_URL = configService.get('DB_URL');
// export const REDIS_HOST = getEnv("REDIS_HOST");
// export const REDIS_PASSWORD = getEnv("REDIS_PASSWORD");
// export const REDIS_PORT = getEnv("REDIS_PORT");

export const REDIS_CLIENT_NAME = configService.get('REDIS_CLIENT_NAME');
export const REDIS_PORT = configService.get('REDIS_PORT');
export const REDIS_HOST = configService.get('REDIS_HOST');
export const REDIS_PASSWORD = configService.get('REDIS_PASSWORD');
export const JWT_SECRET_KEY = configService.get('JWT_SECRET_KEY');
export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes('dev'),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes('test'),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes('prod'),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes('staging'),
  env: process.env.NODE_ENV,
};
