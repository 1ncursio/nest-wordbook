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
import { WordbookSpacesService } from './wordbook-spaces.service';
import { CreateWordbookSpaceDto } from './dto/create-wordbook-space.dto';
import { UpdateWordbookSpaceDto } from './dto/update-wordbook-space.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wordbookspaces')
export class WordbookSpacesController {
  constructor(private readonly wordbookSpacesService: WordbookSpacesService) {}

  @Post()
  async create(
    @Body() createWordbookSpaceDto: CreateWordbookSpaceDto,
    @UserDecorator() user: User,
  ) {
    console.log(user);
    return this.wordbookSpacesService.create(createWordbookSpaceDto, user.id);
  }

  @Post(':id/link')
  async generateEntryCode(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.generateEntryCode(id, user.id);
  }

  @Get()
  async findAll(@UserDecorator() user: User) {
    return this.wordbookSpacesService.findAllMyWordbookSpaces(user.id);
  }

  @Get(':id')
  async findOneMyWordbookSpace(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.findOneMyWordbookSpace(id, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWordbookSpaceDto: UpdateWordbookSpaceDto,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.update(
      id,
      updateWordbookSpaceDto,
      user.id,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.wordbookSpacesService.removeMyWordbookSpace(id, user.id);
  }
}
