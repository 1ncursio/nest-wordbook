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
import { WordbookSpaceRoleGuard } from 'src/auth/wordbook-space-role.guard';
import { WordbookSpaceRoleDecorator } from 'src/auth/wordbook-space-role.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wordbook Spaces')
@UseGuards(JwtAuthGuard)
@Controller('wordbookspaces')
export class WordbookSpacesController {
  constructor(private readonly wordbookSpacesService: WordbookSpacesService) {}

  @Post()
  async create(
    @Body() createWordbookSpaceDto: CreateWordbookSpaceDto,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.create(createWordbookSpaceDto, user.id);
  }

  @WordbookSpaceRoleDecorator(['canInvite'])
  @UseGuards(WordbookSpaceRoleGuard)
  @Post(':wordbookSpaceId/link')
  async generateEntryCode(
    @Param('wordbookSpaceId') wordbookSpaceId: string,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.generateEntryCode(
      wordbookSpaceId,
      user.id,
    );
  }

  @Get()
  async findAll(@UserDecorator() user: User) {
    return this.wordbookSpacesService.findAllMyWordbookSpaces(user.id);
  }

  @Get(':wordbookSpaceId')
  async findOneMyWordbookSpace(
    @Param('wordbookSpaceId') wordbookSpaceId: string,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.findOneMyWordbookSpace(
      wordbookSpaceId,
      user.id,
    );
  }

  @Patch(':wordbookSpaceId')
  async update(
    @Param('wordbookSpaceId') wordbookSpaceId: string,
    @Body() updateWordbookSpaceDto: UpdateWordbookSpaceDto,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.update(
      wordbookSpaceId,
      updateWordbookSpaceDto,
      user.id,
    );
  }

  @Delete(':wordbookSpaceId')
  async remove(
    @Param('wordbookSpaceId') wordbookSpaceId: string,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesService.removeMyWordbookSpace(
      wordbookSpaceId,
      user.id,
    );
  }
}
