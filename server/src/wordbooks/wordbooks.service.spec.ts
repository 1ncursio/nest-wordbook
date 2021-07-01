import { Test, TestingModule } from '@nestjs/testing';
import { WordbooksService } from './wordbooks.service';

describe('WordbooksService', () => {
  let service: WordbooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordbooksService],
    }).compile();

    service = module.get<WordbooksService>(WordbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
