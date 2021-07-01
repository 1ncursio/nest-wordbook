import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { WordbooksService } from './wordbooks.service';

@Controller('wordbooks')
export class WordbooksController {
  constructor(private wordbooksService: WordbooksService) {}

  @Get()
  async getAllWordBooks() {
    //   return this.wordbooksService
  }

  @Get(':wordbookId')
  async getSpecificWordBook(
    @Param('wordbookId', ParseIntPipe) wordbookId: number,
  ) {}

  @Post()
  async createWordBook() {}

  @Patch()
  async updateWordBook() {}

  @Delete()
  async deleteWordBook() {}
}
