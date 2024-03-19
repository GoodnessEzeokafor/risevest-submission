import { Module } from '@nestjs/common';
import { RedisServiceModule } from '../../frameworks/cache-services/redis/redis-manager-service.module';

@Module({
  imports: [RedisServiceModule],
  exports: [RedisServiceModule],
})
export class CacheServicesModule {}
