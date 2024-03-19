import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from 'src/services/database-service/database-services.module';
import { UtilsServicesModule } from 'src/services/utils';
import { UserFactoryServices } from './user-factory.service';
import { UserServices } from './user.service';
import { CacheServicesModule } from 'src/services/cache-service/cache-service.module';

@Module({
  imports: [CacheServicesModule, DatabaseServicesModule, UtilsServicesModule],
  providers: [UserServices, UserFactoryServices],
  exports: [UserServices],
})
export class UserServicesModule {}
