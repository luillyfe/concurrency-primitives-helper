import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a message for the  endpoint', () => {
      const response = appController.getHello();
      expect(response.message).toEqual('root endpoint for the prediction API');
    });
  });
});
