import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { Users } from 'src/entities/user.entity';
import { CreateWordBookDto } from './dto/create-word-book.dto';
import { UpdateWordBookDto } from './dto/update-word-book.dto';
import { WordbooksService } from './wordbooks.service';

@Controller('wordbooks')
export class WordbooksController {
  constructor(private wordbooksService: WordbooksService) {}

  @Get()
  async findWordBooks() {
    return this.wordbooksService.findWordBooks();
  }

  @Get(':wordBookId')
  async findOneWordBook(@Param('wordBookId', ParseIntPipe) wordBookId: number) {
    return this.wordbooksService.findOneWordBook(wordBookId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWordBook(
    @UserDecorator() user: Users,
    @Body() createWordBookDto: CreateWordBookDto,
  ) {
    return this.wordbooksService.createWordBook(createWordBookDto, user.id);
  }

  @Patch(':wordbookId')
  async updateWordBook(
    @UserDecorator() user: Users,
    @Body() data: UpdateWordBookDto,
  ) {
    return this.wordbooksService.updateWordBook();
  }

  @Delete(':wordbookId')
  async deleteWordBook() {
    return this.wordbooksService.deleteWordBook();
  }
}
