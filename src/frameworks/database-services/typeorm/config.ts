import 'reflect-metadata';
import models from './models';
import { DB_URL } from 'src/core';

// const configService = new ConfigService();

export enum DATABASE_TYPES {
  MYSQL = 'mysql',
  PG = 'postgres',
}

export const DATABASE_CONFIG = {
  type: DATABASE_TYPES.PG,
  url: DB_URL,
  entities: [...models],
  migrations: [__dirname + '/migrations/staging/*.ts'],

  migrationsTableName: 'custom_migration',
  synchronize: false, // default setting
  retryAttempts: 10,
  retryDelay: 3000,
  logging: false,
  autoLoadEntities: false,
  cli: {
    migrationsDir: '../staging',
  },
};
