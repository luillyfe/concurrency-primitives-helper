import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { ConcurrentService } from '../concurrent/concurrent.service';

import { PredictionController } from './prediction.controller';

describe('PredictionController', () => {
  let controller: PredictionController;
  let concurrentService: ConcurrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionController],
      providers: [
        {
          provide: ConcurrentService,
          useValue: {
            predict: jest.fn().mockReturnValue('test output'),
          },
        },
      ],
    }).compile();

    concurrentService = module.get<ConcurrentService>(ConcurrentService);
    controller = module.get<PredictionController>(PredictionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('predict', () => {
    it('should return an error if the text input is empty', async () => {
      const text = '';
      try {
        await controller.predict(text);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Please enter a valid text input');
      }
    });

    it('should return the output of the predict method from the concurrentService', async () => {
      const text = 'test';
      const expectedOutput = 'test output';
      jest.spyOn(concurrentService, 'predict').mockImplementation(async () => {
        return expectedOutput;
      });
      const response = await controller.predict(text);
      expect(response).toEqual(expectedOutput);
    });
  });
});
