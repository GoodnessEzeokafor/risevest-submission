import { Injectable } from '@nestjs/common';
import { IGetUsers, UserEntity } from 'src/core';
import { EncryptionUtilsService } from 'src/services/utils';

@Injectable()
export class UserFactoryServices {
  constructor(private encryption: EncryptionUtilsService) {}
  async create(data: Partial<UserEntity>) {
    const user = new UserEntity();
    if (data.email) user.email = data.email;
    if (data.firstName) user.firstName = data.firstName.toLowerCase().trim();
    if (data.lastName) user.lastName = data.lastName.toLowerCase().trim();
    if (data.fullName) user.fullName = data.fullName.toLowerCase().trim();
    if (data.username) user.username = data.username.toLowerCase().trim();

    if (data.password)
      user.password = await this.encryption.hash(data.password);

    return user;
  }

  cleanUserQuery(data: IGetUsers): Partial<IGetUsers> {
    let key = {};
    if (data.id) key['id'] = data.id;
    if (data.firstName) key['firstName'] = data.firstName;
    if (data.lastName) key['lastName'] = data.lastName;
    if (data.email) key['email'] = data.email;
    if (data.perpage) key['perpage'] = data.perpage;
    if (data.page) key['page'] = data.page;
    if (data.sort) key['sort'] = data.sort;
    if (data.q) key['q'] = data.q;
    return key;
  }
}
