import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { HealthController } from '..';

/**
 * Simple mock tests, in this case I just mocked one of the service and controller function
 * Other services function and controllers can be tested using the same idea outlined here
 */
describe('HealthController', () => {
  let controller: HealthController;
  const result = {
    message: 'OK',
  };

  const mockResponse = {
    // Populate with necessary properties based on your method's requirements
    status: jest.fn().mockReturnThis(), // Mock the status method and return the mockResponse object for chaining
    json: jest.fn(), // Mock the json method
  } as unknown as Response;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    })

      .compile();

    controller = moduleRef.get<HealthController>(HealthController);
  });

  describe('health endpoint', () => {
    it('should return OK', async () => {
      await controller.health(mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(result);
    });
  });
});
