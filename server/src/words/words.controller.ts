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
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('wordbooks/:wordbookId/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  async create(
    @Param('wordbookId') wordbookId: string,
    @Body() createWordDto: CreateWordDto,
    @UserDecorator() user: User,
  ) {
    return this.wordsService.create(+wordbookId, createWordDto, user.id);
  }

  @Get()
  async findAll(@Param('wordbookId') wordbookId: string) {
    return this.wordsService.findAll(+wordbookId);
  }

  @Get(':wordId')
  async findOne(@Param('wordId') wordId: string) {
    return this.wordsService.findOne(+wordId);
  }

  @Patch(':wordId')
  async update(
    @Param('wordbookId') wordbookId: string,
    @Param('wordId') wordId: string,
    @Body() updateWordDto: UpdateWordDto,
    @UserDecorator() user: User,
  ) {
    return this.wordsService.update(
      +wordbookId,
      +wordId,
      updateWordDto,
      user.id,
    );
  }

  @Delete(':wordId')
  async remove(@Param('wordId') wordId: string) {
    return this.wordsService.remove(+wordId);
  }
}
