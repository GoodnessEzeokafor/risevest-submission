import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get('/')
  async health(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ message: 'OK' });
  }
}
