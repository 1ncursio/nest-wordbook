import { Test, TestingModule } from '@nestjs/testing';
import { WordbookSpacesService } from './wordbook-spaces.service';

describe('WordbookspacesService', () => {
  let service: WordbookSpacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordbookSpacesService],
    }).compile();

    service = module.get<WordbookSpacesService>(WordbookSpacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
