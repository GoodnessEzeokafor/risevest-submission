import { CreateUserDto, GetUsersQueryDto, LoginUserDto } from 'src/core/dto';

export type ICreateUser = CreateUserDto;
export type IGetUsers = GetUsersQueryDto;
export type IGetAuthUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};
export type ILoginUser = LoginUserDto;
