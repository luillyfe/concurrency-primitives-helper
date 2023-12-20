import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GoogleGenerativeAI } from '@google/generative-ai';

import { ConcurrentService } from './concurrent.service';

jest.mock('@google/generative-ai');

describe('ConcurrentService', () => {
  let service: ConcurrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcurrentService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<ConcurrentService>(ConcurrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
