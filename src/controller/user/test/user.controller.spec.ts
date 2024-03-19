import { Test } from '@nestjs/testing';
import { UserController } from '..';
import {
  IGetPosts,
  // IDatabaseServices,
  IGetUsers,
  IResponse,
  ResponseState,
} from 'src/core';
import { Response } from 'express';
import { GetUsersQueryDto } from 'src/core/dto';
import { UserServices } from 'src/services/use-case/user/user.service';
import { PostServices } from 'src/services/use-case/post/post.service';
// import { PostServices } from 'src/services/use-case/post/post.service';
// import { PostFactoryServices } from 'src/services/use-case/post/post-factory.service';
// import { ErrorUtilsService, ResponseUtilsService } from 'src/services/utils';

/**
 * Simple mock tests, in this case I just mocked one of the service and controller function
 * Other services function and controllers can be tested using the same idea outlined here
 */
describe('UserController', () => {
  let controller: UserController;
  const result: IResponse = {
    message: 'Retrieved successfully',
    data: [
      {
        id: 2,
        fullName: 'goodness ezeh',
        firstName: 'goodness',
        lastName: 'ezeh',
        email: 'chinemeremwork@gmail.com',
        username: 'chinemerem',
        createdAt: '2024-03-19T07:51:02.096Z',
        updatedAt: '2024-03-19T07:51:02.096Z',
        version: 'one',
        posts: [],
        comments: [],
      },
    ],
    pagination: {
      hasPrevious: false,
      prevPage: 0,
      hasNext: false,
      next: 2,
      currentPage: 1,
      pageSize: 10,
      lastPage: 1,
      total: 1,
    },
    state: ResponseState.SUCCESS,
    status: 200,
  };
  const mockQueryParams = {} as GetUsersQueryDto;

  const mockResponse = {
    // Populate with necessary properties based on your method's requirements
    status: jest.fn().mockReturnThis(), // Mock the status method and return the mockResponse object for chaining
    json: jest.fn(), // Mock the json method
  } as unknown as Response;

  const mockUserService = {
    getUsers: jest.fn((_payload: IGetUsers): Promise<IResponse> => {
      return Promise.resolve(result);
    }),
  };
  const mockPostService = {
    getPosts: jest.fn((_payload: IGetPosts): Promise<IResponse> => {
      return Promise.resolve(result);
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServices, PostServices],
    })
      .overrideProvider(UserServices)
      .useValue(mockUserService)
      .overrideProvider(PostServices)
      .useValue(mockPostService)

      .compile();

    controller = moduleRef.get<UserController>(UserController);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(mockUserService, 'getUsers')
        .mockImplementation(() => Promise.resolve(result));
      await controller.getUsers(mockQueryParams, mockResponse);
      expect(mockUserService.getUsers).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(result);
    });
  });
});
