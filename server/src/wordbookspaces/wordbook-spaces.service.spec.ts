import { Test, TestingModule } from '@nestjs/testing';
import { WordbookspacesService } from './wordbook-spaces.service';

describe('WordbookspacesService', () => {
  let service: WordbookspacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordbookspacesService],
    }).compile();

    service = module.get<WordbookspacesService>(WordbookspacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
