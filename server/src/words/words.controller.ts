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

@Controller('wordbooks/:wordBookId/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  async create(
    @Param('wordBookId') wordBookId: string,
    @Body() createWordDto: CreateWordDto,
    @UserDecorator() user: User,
  ) {
    return this.wordsService.create(+wordBookId, createWordDto, user.id);
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
    @Param('wordBookId') wordBookId: string,
    @Param('wordId') wordId: string,
    @Body() updateWordDto: UpdateWordDto,
    @UserDecorator() user: User,
  ) {
    return this.wordsService.update(
      +wordBookId,
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
