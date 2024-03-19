import { Module } from '@nestjs/common';
import { CacheServicesModule } from 'src/services/cache-service/cache-service.module';
import { DatabaseServicesModule } from 'src/services/database-service/database-services.module';
import { UtilsServicesModule } from 'src/services/utils';
import { PostFactoryServices } from './post-factory.service';
import { PostServices } from './post.service';

@Module({
  imports: [CacheServicesModule, DatabaseServicesModule, UtilsServicesModule],
  providers: [PostServices, PostFactoryServices],
  exports: [PostServices],
})
export class PostServicesModule {}
