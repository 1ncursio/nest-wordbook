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
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWordBookDto } from './dto/create-word-book.dto';
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

  @UseGuards(LoggedInGuard)
  @Post()
  async createWordBook(@User() user: Users, @Body() data: CreateWordBookDto) {
    console.log(data);
    return this.wordbooksService.createWordBook(
      data.name,
      data.visibility,
      user.id,
    );
  }

  @Patch(':wordbookId')
  async updateWordBook() {
    return this.wordbooksService.updateWordBook();
  }

  @Delete()
  async deleteWordBook() {
    return this.wordbooksService.deleteWordBook();
  }
}
