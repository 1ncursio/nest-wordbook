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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { MemberGuard } from 'src/wordbook-spaces-members/guards/member.guard';
import { CreateWordbookDto } from './dto/create-word-book.dto';
import { UpdateWordbookDto } from './dto/update-word-book.dto';
import { WordbooksService } from './wordbooks.service';

@ApiTags('Wordbooks')
@UseGuards(JwtAuthGuard)
@Controller('wordbookspaces')
export class WordbooksController {
  constructor(private wordbooksService: WordbooksService) {}

  // @Get(':wordbookspaceId/wordbooks')
  // async findWordbooks() {
  //   return this.wordbooksService.findWordbooks();
  // }

  @UseGuards(MemberGuard)
  @Get(':wordbookspaceId/wordbooks/:wordbookId')
  async findOneWordbook(@Param('wordbookId') wordbookId: string) {
    return this.wordbooksService.findOneWordbook(wordbookId);
  }

  @UseGuards(MemberGuard)
  @Post(':wordbookspaceId/wordbooks')
  async createWordbook(
    @UserDecorator() user: User,
    @Body() createWordbookDto: CreateWordbookDto,
  ) {
    return this.wordbooksService.createWordbook(createWordbookDto, user.id);
  }

  @UseGuards(MemberGuard)
  @Patch(':wordbookspaceId/wordbooks/:wordbookId')
  async updateWordbook(
    @UserDecorator() user: User,
    @Body() data: UpdateWordbookDto,
  ) {
    return this.wordbooksService.updateWordbook();
  }

  @UseGuards(MemberGuard)
  @Delete(':wordbookspaceId/wordbooks/:wordbookId')
  async deleteWordbook() {
    return this.wordbooksService.deleteWordbook();
  }
}
