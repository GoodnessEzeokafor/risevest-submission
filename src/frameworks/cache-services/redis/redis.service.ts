import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { env } from 'src/core';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get(key: string): Promise<string> {
    try {
      const value: string = await this.cacheManager.get(`${env.env}-${key}`);
      return value;
    } catch (e) {
      Logger.error('@cache-manager-service', e);
    }
    return null;
  }

  // ttl is in milliseconds
  public async set(key: string, value: any, ttl: number) {
    try {
      await this.cacheManager.set(`${env.env}-${key}`, value, ttl);
    } catch (e) {
      Logger.error('@cache-manager-service', e);
    }
    return false;
  }

  public async del(key: string) {
    try {
      await this.cacheManager.del(`${env.env}-${key}`);
    } catch (e) {
      Logger.error('@cache-manager-service', e);
    }
    return false;
  }

  public async reset(): Promise<void> {
    try {
      await this.cacheManager.reset();
    } catch (e) {
      Logger.error('@cache-manager-service', e);
    }
  }

  public async ttl(key: string): Promise<number> {
    try {
      const ttl = await this.cacheManager.store.ttl(`${env.env}-${key}`);
      return ttl || 0;
    } catch (e) {
      Logger.error('@cache-manager-service', e);
    }
    return 0;
  }
  // public async close() {
  //   const client = await this.cacheManager.store.getClient();
  //   await client.quit();
  // }
}
