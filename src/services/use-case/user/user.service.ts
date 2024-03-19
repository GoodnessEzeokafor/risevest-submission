import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  ICreateUser,
  IDatabaseServices,
  IGetAuthUser,
  IGetUsers,
  ILoginUser,
} from 'src/core';
import { UserFactoryServices } from './user-factory.service';
import { DataSource } from 'typeorm';
import {
  EncryptionUtilsService,
  ErrorUtilsService,
  JwtUtilsService,
  ResponseUtilsService,
  StringUtilsService,
  TimeUtilsService,
} from 'src/services/utils';

@Injectable()
export class UserServices implements OnApplicationShutdown {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly userFactory: UserFactoryServices,
    private readonly response: ResponseUtilsService,
    private readonly connection: DataSource,
    private readonly jwt: JwtUtilsService,
    private readonly time: TimeUtilsService,
    private readonly error: ErrorUtilsService,
    private readonly string: StringUtilsService,
    private readonly encryption: EncryptionUtilsService,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async createUser(payload: ICreateUser) {
    const { email, username, firstName, lastName } = payload;
    try {
      const userExists = await this.data.users.findOne([
        { email },
        { username },
      ]);
      if (userExists) {
        return this.response.error409Response(
          'Email or Username already exists',
        );
      }
      const cleanFirstName = this.string.toTitleCase(firstName);
      const cleanLastName = this.string.toTitleCase(lastName);

      const factory = await this.userFactory.create({
        ...payload,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        fullName: `${cleanFirstName} ${cleanLastName}`,
      });
      const user = await this.data.users.create(factory);

      const jwtPayload = {
        id: user.id,
        email: user.email,
      };
      const oneHr = this.time.convertToSeconds('minute', 60);
      const token = await this.jwt.sign(jwtPayload, oneHr);

      return this.response.success201Response({
        message: 'Created successfully',
        token: `Bearer ${token}`,
        data: {},
      });
    } catch (error) {
      return this.error.error({
        error,
      });
    }
  }

  async login(payload: ILoginUser) {
    const { email, password } = payload;
    try {
      const user = await this.data.users.findOne({ email });

      if (this.string.isEmpty(user)) {
        return this.response.error400Response('Email or password incorrect');
      }
      if (this.string.isEmpty(user.password)) {
        return this.response.error400Response('Please reset your password');
      }

      const correctPassword: boolean = await this.encryption.compareHash(
        password,
        user?.password,
      );
      if (!correctPassword) {
        return this.response.error400Response('Email or password incorrect');
      }

      const jwtPayload = {
        id: user.id,
        email: user.email,
      };

      const oneHr = this.time.convertToSeconds('minute', 60);
      const token = await this.jwt.sign(jwtPayload, oneHr);

      return this.response.success200Response({
        message: 'Logged in successfully',
        token: `Bearer ${token}`,
        data: {},
      });
    } catch (error) {
      return this.error.error({
        error,
      });
    }
  }
  async getUsers(payload: IGetUsers) {
    try {
      const filterQuery = this.userFactory.cleanUserQuery(payload);
      const { data, pagination } = await this.data.users.findAllWithPagination(
        filterQuery,
        {
          selectFields: [
            'id',
            'fullName',
            'firstName',
            'lastName',
            'email',
            'username',
            'version',
            'createdAt',
            'updatedAt',
          ],
        },
      );

      return this.response.success200Response({
        message: 'Retrieved successfully',
        data,
        pagination,
      });
    } catch (error) {
      return this.error.error({ error });
    }
  }

  async getAuthUser(payload: IGetAuthUser) {
    try {
      return this.response.success200Response({
        message: 'Retrieved successfully',
        data: payload,
      });
    } catch (error) {
      return this.error.error({ error });
    }
  }
}
