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
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';
import { CreateWordbookSpacesMemberDto } from './dto/create-wordbook-spaces-member.dto';
import { UpdateWordbookSpacesMemberDto } from './dto/update-wordbook-spaces-member.dto';
import { MemberGuard } from './guards/member.guard';
import { NotMemberGuard } from './guards/not-member.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @UseGuards(MemberGuard)
  @Get()
  findAll() {
    return this.wordbookSpacesMembersService.findAll();
  }

  @UseGuards(MemberGuard)
  @Get(':memberId')
  findOne(@Param('memberId') memberId: string) {
    return this.wordbookSpacesMembersService.findOne(memberId);
  }

  @UseGuards(MemberGuard)
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

  @UseGuards(MemberGuard)
  @Delete(':memberId')
  remove(@Param('memberId') memberId: string) {
    return this.wordbookSpacesMembersService.remove(memberId);
  }
}
