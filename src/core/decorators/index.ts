import { SetMetadata } from '@nestjs/common';

export const Authorization = (tag: boolean) =>
  SetMetadata('authorization', tag);
