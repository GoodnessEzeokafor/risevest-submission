import { Module } from '@nestjs/common';

import { DATABASE_CONFIG } from './config';
import { TypeOrmDatabaseServices } from './typeorm.service';
import { IDatabaseServices } from 'src/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG)],
  providers: [
    {
      provide: IDatabaseServices,
      useClass: TypeOrmDatabaseServices,
    },
  ],
  exports: [IDatabaseServices],
})
export class TypeOrmServicesModule {}
