import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IDatabaseServices } from 'src/core';
import { JwtUtilsService } from '../utils';
import { DoesNotExistsException, UnAuthorizedException } from 'src/exceptions';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly reflector: Reflector,
    private readonly jwt: JwtUtilsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: any = context.switchToHttp().getRequest();

      const decorator = this.reflector.get<boolean>(
        'authorization',
        context.getHandler(),
      );
      if (!decorator) return true;

      let token = request.headers.authorization;
      if (!token) throw new UnAuthorizedException('Unauthorized');
      token = token.replace('Bearer ', '');

      const decoded = await this.jwt.verify(token);
      if (!decoded) {
        console.log('--- decoded failed --');
        throw new UnAuthorizedException('Session has expired, please login');
      }

      const user = await this.data.users.findOne({ id: Number(decoded.id) });
      if (!user) throw new DoesNotExistsException('User does not exists');

      request.user = user;

      return true;
    } catch (error) {
      throw new UnAuthorizedException(error);
    }
  }
}
