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
import { WordbookspacesService } from './wordbook-spaces.service';
import { CreateWordbookSpaceDto } from './dto/create-wordbook-space.dto';
import { UpdateWordbookSpaceDto } from './dto/update-wordbook-space.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wordbookspaces')
export class WordbookspacesController {
  constructor(private readonly wordbookspacesService: WordbookspacesService) {}

  @Post()
  async create(
    @Body() createWordbookSpaceDto: CreateWordbookSpaceDto,
    @UserDecorator() user: User,
  ) {
    console.log(user);
    return this.wordbookspacesService.create(createWordbookSpaceDto, user.id);
  }

  @Get()
  async findAll(@UserDecorator() user: User) {
    return this.wordbookspacesService.findAllMyWordbookSpaces(user.id);
  }

  @Get(':id')
  async findOneMyWordbookSpace(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    return this.wordbookspacesService.findOneMyWordbookSpace(id, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWordbookSpaceDto: UpdateWordbookSpaceDto,
    @UserDecorator() user: User,
  ) {
    return this.wordbookspacesService.update(
      id,
      updateWordbookSpaceDto,
      user.id,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.wordbookspacesService.removeMyWordbookSpace(id, user.id);
  }
}
