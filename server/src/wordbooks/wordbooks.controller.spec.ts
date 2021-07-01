import { Test, TestingModule } from '@nestjs/testing';
import { WordbooksController } from './wordbooks.controller';

describe('WordbooksController', () => {
  let controller: WordbooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordbooksController],
    }).compile();

    controller = module.get<WordbooksController>(WordbooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
