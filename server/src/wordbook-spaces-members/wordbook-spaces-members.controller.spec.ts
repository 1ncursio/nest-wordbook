import { Test, TestingModule } from '@nestjs/testing';
import { WordbookSpacesMembersController } from './wordbook-spaces-members.controller';
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';

describe('WordbookSpacesMembersController', () => {
  let controller: WordbookSpacesMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordbookSpacesMembersController],
      providers: [WordbookSpacesMembersService],
    }).compile();

    controller = module.get<WordbookSpacesMembersController>(WordbookSpacesMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
