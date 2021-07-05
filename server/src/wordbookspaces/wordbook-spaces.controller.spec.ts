import { Test, TestingModule } from '@nestjs/testing';
import { WordbookspacesController } from './wordbook-spaces.controller';
import { WordbookspacesService } from './wordbook-spaces.service';

describe('WordbookspacesController', () => {
  let controller: WordbookspacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordbookspacesController],
      providers: [WordbookspacesService],
    }).compile();

    controller = module.get<WordbookspacesController>(WordbookspacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
