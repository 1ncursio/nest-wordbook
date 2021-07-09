import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { MemberGuard } from './guards/member.guard';
import { NotMemberGuard } from './guards/not-member.guard';
import { WordbookSpacesMembersController } from './wordbook-spaces-members.controller';
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, WordbookSpace, WordbookSpaceMember]),
  ],
  controllers: [WordbookSpacesMembersController],
  providers: [WordbookSpacesMembersService, MemberGuard, NotMemberGuard],
})
export class WordbookSpacesMembersModule {}
