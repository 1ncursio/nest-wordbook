import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';
import { CreateWordbookSpacesMemberDto } from './dto/create-wordbook-spaces-member.dto';
import { UpdateWordbookSpacesMemberDto } from './dto/update-wordbook-spaces-member.dto';

@Controller('wordbookspaces/:wordbookSpaceId/members')
export class WordbookSpacesMembersController {
  constructor(
    private readonly wordbookSpacesMembersService: WordbookSpacesMembersService,
  ) {}

  @Post()
  enterMemberIntoWordbookSpace(
    @Body() createWordbookSpacesMemberDto: CreateWordbookSpacesMemberDto,
  ) {
    return this.wordbookSpacesMembersService.enterMemberIntoWordbookSpace(
      createWordbookSpacesMemberDto,
    );
  }

  @Get()
  findAll() {
    return this.wordbookSpacesMembersService.findAll();
  }

  @Get(':memberId')
  findOne(@Param('memberId') memberId: string) {
    return this.wordbookSpacesMembersService.findOne(memberId);
  }

  @Patch(':memberId')
  update(
    @Param('memberId') memberId: string,
    @Body() updateWordbookSpacesMemberDto: UpdateWordbookSpacesMemberDto,
  ) {
    return this.wordbookSpacesMembersService.update(
      memberId,
      updateWordbookSpacesMemberDto,
    );
  }

  @Delete(':memberId')
  remove(@Param('memberId') memberId: string) {
    return this.wordbookSpacesMembersService.remove(memberId);
  }
}
