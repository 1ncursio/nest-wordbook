import { Test, TestingModule } from '@nestjs/testing';
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';

describe('WordbookSpacesMembersService', () => {
  let service: WordbookSpacesMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordbookSpacesMembersService],
    }).compile();

    service = module.get<WordbookSpacesMembersService>(WordbookSpacesMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
