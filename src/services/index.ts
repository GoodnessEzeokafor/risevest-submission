import { CacheServicesModule } from './cache-service/cache-service.module';
import { DatabaseServicesModule } from './database-service/database-services.module';
import { PostServicesModule } from './use-case/post/post.module';
import { UserServicesModule } from './use-case/user/user.module';
import { UtilsServicesModule } from './utils';

export default [
  CacheServicesModule,
  DatabaseServicesModule,
  PostServicesModule,
  UserServicesModule,
  UtilsServicesModule,
];
