import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { WordbookSpaceRoleDecorator } from 'src/auth/wordbook-space-role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Words')
@UseGuards(JwtAuthGuard)
@Controller('wordbookspaces')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @WordbookSpaceRoleDecorator(['canCreate'])
  @Post('/:wordbookSpaceId/wordbooks/:wordbookId/words')
  async createWord(
    @Param('wordbookId') wordbookId: string,
    @Body() createWordDto: CreateWordDto,
  ) {
    return this.wordsService.createWord(wordbookId, createWordDto);
  }

  // @Get()
  // async findAll(@Param('wordbookId') wordbookId: string) {
  //   return this.wordsService.findAll(wordbookId);
  // }

  // @Get(':wordId')
  // async findOne(@Param('wordId') wordId: string) {
  //   return this.wordsService.findOne(wordId);
  // }

  @Patch('/:wordbookSpaceId/wordbooks/:wordbookId/words/:wordId')
  async update(
    @Param('wordbookId') wordbookId: string,
    @Param('wordId') wordId: string,
    @Body() updateWordDto: UpdateWordDto,
    @UserDecorator() user: User,
  ) {
    return this.wordsService.update(wordbookId, wordId, updateWordDto, user.id);
  }

  @Delete('/:wordbookSpaceId/wordbooks/:wordbookId/words/:wordId')
  async remove(@Param('wordId') wordId: string) {
    return this.wordsService.remove(wordId);
  }
}
