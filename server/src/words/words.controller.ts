import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('wordbooks/:wordBookId/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  async create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  async findAll(@Param('wordBookId') wordBookId: string) {
    return this.wordsService.findAll(+wordBookId);
  }

  @Get(':wordId')
  async findOne(@Param('wordId') wordId: string) {
    return this.wordsService.findOne(+wordId);
  }

  @Patch(':wordId')
  async update(
    @Param('wordId') wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    return this.wordsService.update(+wordId, updateWordDto);
  }

  @Delete(':wordId')
  async remove(@Param('wordId') wordId: string) {
    return this.wordsService.remove(+wordId);
  }
}
