import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './services/guards-service/auth.guard';
import controller from './controller';
import services from './services';

@Module({
  imports: [...services],
  controllers: [AppController, ...controller],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AppService,
  ],
})
export class AppModule {}
