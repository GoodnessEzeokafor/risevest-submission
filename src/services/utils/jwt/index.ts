import { Injectable } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from 'src/core';

@Injectable()
export class JwtUtilsService {
  async sign(payload: Record<string, any>, expiresIn: number) {
    const cPayload = payload;
    delete cPayload.exp;

    return sign(cPayload, JWT_SECRET_KEY, {
      expiresIn,
    });
  }

  async verify(token: string): Promise<any> {
    return verify(token, JWT_SECRET_KEY);
  }
}
