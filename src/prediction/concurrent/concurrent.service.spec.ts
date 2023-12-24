import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { ConcurrentService } from './concurrent.service';
import { GenerativeModel } from '@google/generative-ai';

let model: GenerativeModel;
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: function () {
      return {
        getGenerativeModel: () => model,
      };
    },
    HarmCategory: {},
    HarmBlockThreshold: {},
  };
});

beforeAll(() => {
  // @ts-expect-error: no need to define all properties
  model = {
    generateContent: jest.fn().mockImplementation(() => {
      return {
        response: {
          text: () => 'test output',
        },
      };
    }),
  };
});

describe('ConcurrentService', () => {
  let service: ConcurrentService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcurrentService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    service = module.get<ConcurrentService>(ConcurrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call model.generateContent', async () => {
    // Act
    await service.predictTodos();

    // Assert
    expect(model.generateContent).toHaveBeenCalled();
  });

  it('should return the config service to get the prompt', async () => {
    // Act
    const result = await service.predictGcpExam();

    // Assert
    expect(configService.get).toHaveBeenCalledWith('EXAM_PROMPT');
    expect(model.generateContent).toHaveBeenCalled();
    expect(result).toBe('test output');
  });
});
