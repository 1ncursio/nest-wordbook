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
import { User } from 'src/entities/user.entity';
import { CreateWordbookDto } from './dto/create-word-book.dto';
import { UpdateWordbookDto } from './dto/update-word-book.dto';
import { WordbooksService } from './wordbooks.service';

@Controller('wordbooks')
export class WordbooksController {
  constructor(private wordbooksService: WordbooksService) {}

  @Get()
  async findWordbooks() {
    return this.wordbooksService.findWordbooks();
  }

  @Get(':wordbookId')
  async findOneWordbook(@Param('wordbookId', ParseIntPipe) wordbookId: number) {
    return this.wordbooksService.findOneWordbook(wordbookId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWordbook(
    @UserDecorator() user: User,
    @Body() createWordbookDto: CreateWordbookDto,
  ) {
    return this.wordbooksService.createWordbook(createWordbookDto, user.id);
  }

  @Patch(':wordbookId')
  async updateWordbook(
    @UserDecorator() user: User,
    @Body() data: UpdateWordbookDto,
  ) {
    return this.wordbooksService.updateWordbook();
  }

  @Delete(':wordbookId')
  async deleteWordbook() {
    return this.wordbooksService.deleteWordbook();
  }
}
