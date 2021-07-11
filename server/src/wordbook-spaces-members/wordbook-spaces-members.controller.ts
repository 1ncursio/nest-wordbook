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
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wordbook Space Members')
@UseGuards(JwtAuthGuard)
@Controller('wordbookspaces/:wordbookSpaceId/members')
export class WordbookSpacesMembersController {
  constructor(
    private readonly wordbookSpacesMembersService: WordbookSpacesMembersService,
  ) {}

  @UseGuards(NotMemberGuard)
  @Post()
  enterMemberIntoWordbookSpace(
    @Body() createWordbookSpacesMemberDto: CreateWordbookSpacesMemberDto,
    @UserDecorator() user: User,
  ) {
    return this.wordbookSpacesMembersService.enterMemberIntoWordbookSpace(
      createWordbookSpacesMemberDto,
      user.id,
    );
  }

  @UseGuards(MemberGuard)
  @Get()
  findAllMembersInWordbookSpace(
    @Param('wordbookSpaceId') wordbookSpaceId: string,
  ) {
    return this.wordbookSpacesMembersService.findAllMembersInWordbookSpace(
      wordbookSpaceId,
    );
  }

  @UseGuards(MemberGuard)
  @Get(':memberId')
  findOne(
    @Param('wordbookSpaceId') wordbookSpaceId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.wordbookSpacesMembersService.findOne(wordbookSpaceId, memberId);
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
