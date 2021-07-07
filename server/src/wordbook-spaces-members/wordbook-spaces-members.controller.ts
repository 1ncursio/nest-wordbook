import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';
import { CreateWordbookSpacesMemberDto } from './dto/create-wordbook-spaces-member.dto';
import { UpdateWordbookSpacesMemberDto } from './dto/update-wordbook-spaces-member.dto';

@Controller('wordbook-spaces-members')
export class WordbookSpacesMembersController {
  constructor(private readonly wordbookSpacesMembersService: WordbookSpacesMembersService) {}

  @Post()
  create(@Body() createWordbookSpacesMemberDto: CreateWordbookSpacesMemberDto) {
    return this.wordbookSpacesMembersService.create(createWordbookSpacesMemberDto);
  }

  @Get()
  findAll() {
    return this.wordbookSpacesMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordbookSpacesMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordbookSpacesMemberDto: UpdateWordbookSpacesMemberDto) {
    return this.wordbookSpacesMembersService.update(+id, updateWordbookSpacesMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordbookSpacesMembersService.remove(+id);
  }
}
