import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { AppService } from './app.service';
import { ConcurrentService } from './prediction/concurrent/concurrent.service';

import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let concurrentService: ConcurrentService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConcurrentService,
          useValue: {
            predict: jest.fn(),
          },
        },
      ],
    }).compile();

    concurrentService = app.get<ConcurrentService>(ConcurrentService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a message for the  endpoint', () => {
      const response = appController.getHello();
      expect(response.message).toEqual('root endpoint for the prediction API');
    });
  });

  describe('predict', () => {
    it('should return an error if the text input is empty', async () => {
      const text = '';
      try {
        await appController.predict(text);
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
      const response = await appController.predict(text);
      expect(response).toEqual(expectedOutput);
    });
  });
});
