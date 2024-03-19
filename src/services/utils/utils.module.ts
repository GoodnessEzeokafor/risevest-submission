import { Module } from '@nestjs/common';
import { EncryptionUtilsService } from './encryption';
import { ResponseUtilsService } from './response';
import { JwtUtilsService } from './jwt';
import { TimeUtilsService } from './time';
import { ErrorUtilsService } from './error';
import { StringUtilsService } from './string';

@Module({
  imports: [],
  providers: [
    EncryptionUtilsService,
    ResponseUtilsService,
    JwtUtilsService,
    TimeUtilsService,
    ErrorUtilsService,
    StringUtilsService,
  ],
  exports: [
    EncryptionUtilsService,
    ResponseUtilsService,
    JwtUtilsService,
    TimeUtilsService,
    ErrorUtilsService,
    StringUtilsService,
  ],
})
export class UtilsServicesModule {}
