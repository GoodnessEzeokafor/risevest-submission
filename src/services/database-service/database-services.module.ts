import { Module } from '@nestjs/common';
import { TypeOrmServicesModule } from '../../frameworks/database-services/typeorm/typeorm-service.module';

@Module({
  imports: [TypeOrmServicesModule],
  exports: [TypeOrmServicesModule],
})
export class DatabaseServicesModule {}
