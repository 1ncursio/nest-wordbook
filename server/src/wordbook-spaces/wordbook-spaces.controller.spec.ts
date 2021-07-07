import { Test, TestingModule } from '@nestjs/testing';
import { WordbookSpacesController } from './wordbook-spaces.controller';
import { WordbookSpacesService } from './wordbook-spaces.service';

describe('WordbookspacesController', () => {
  let controller: WordbookSpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordbookSpacesController],
      providers: [WordbookSpacesService],
    }).compile();

    controller = module.get<WordbookSpacesController>(WordbookSpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
