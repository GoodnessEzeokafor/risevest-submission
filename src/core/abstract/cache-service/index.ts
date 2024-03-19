export abstract class ICacheService {
  abstract get(key: string): Promise<string>;
  abstract set(key: string, value: any, ttl: number);
  abstract del(key: string);
  abstract reset(): Promise<void>;
  abstract ttl(key: string): Promise<number>;
}
