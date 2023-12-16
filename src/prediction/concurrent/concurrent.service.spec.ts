import { Test, TestingModule } from '@nestjs/testing';
import { ConcurrentService } from './concurrent.service';

describe('ConcurrentService', () => {
  let service: ConcurrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcurrentService],
    }).compile();

    service = module.get<ConcurrentService>(ConcurrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
