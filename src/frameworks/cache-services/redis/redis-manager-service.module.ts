import { redisStore } from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import config from './redis-config';
import { ICacheService } from 'src/core';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';

//
/**
 * new configuration of redis with cache manager
 * link to issues and solution
 * https://github.com/dabroek/node-cache-manager-redis-store/issues/40
 * https://github.com/dabroek/node-cache-manager-redis-store/issues/40#issuecomment-1285403674
 */
@Module({
  imports: [
    CacheModule.register({
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            ...config,
          },
        }),
    }),
  ],
  providers: [
    {
      provide: ICacheService,
      useClass: RedisService,
    },
  ],
  exports: [ICacheService],
})
export class RedisServiceModule {}
