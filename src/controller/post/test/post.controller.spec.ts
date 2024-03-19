import { Test } from '@nestjs/testing';
import { PostController } from '..';
import { PostServices } from 'src/services/use-case/post/post.service';
import { IGetPosts, IResponse, ResponseState } from 'src/core';
import { Request, Response } from 'express';
import { GetPostsQueryDto } from 'src/core/dto';

/**
 * Simple mock tests, in this case I just mocked one of the service and controller function
 * Other services function and controllers can be tested using the same idea outlined here
 */
describe('PostController', () => {
  let controller: PostController;
  const result: IResponse = {
    message: 'Retrieved successfully',
    data: [
      {
        id: 7,
        title: 'Risevest Aquires Chaka',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        createdAt: '2024-03-19T08:42:25.569Z',
        updatedAt: '2024-03-19T08:42:25.569Z',
        version: 'one',
        comments: [2],
        user: 6,
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
  const mockRequest = {
    // Populate with necessary properties based on your method's requirements
    user: {
      id: 6,
      email: 'james@gmail.com',
      firstName: 'james',
      lastName: 'ezeh',
    },
  } as Request;
  const mockQueryParams = {} as GetPostsQueryDto;

  const mockResponse = {
    // Populate with necessary properties based on your method's requirements
    status: jest.fn().mockReturnThis(), // Mock the status method and return the mockResponse object for chaining
    json: jest.fn(), // Mock the json method
  } as unknown as Response;

  const mockPostService = {
    getPosts: jest.fn((_payload: IGetPosts): Promise<IResponse> => {
      return Promise.resolve(result);
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostServices],
    })
      .overrideProvider(PostServices)
      .useValue(mockPostService)
      .compile();

    controller = moduleRef.get<PostController>(PostController);
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      jest
        .spyOn(mockPostService, 'getPosts')
        .mockImplementation(() => Promise.resolve(result));
      await controller.getPosts(mockRequest, mockQueryParams, mockResponse);
      expect(mockPostService.getPosts).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(result);
    });
  });
});
