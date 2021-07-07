import { Module } from '@nestjs/common';
import { WordbookSpacesMembersService } from './wordbook-spaces-members.service';
import { WordbookSpacesMembersController } from './wordbook-spaces-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, WordbookSpace, WordbookSpaceMember]),
  ],
  controllers: [WordbookSpacesMembersController],
  providers: [WordbookSpacesMembersService],
})
export class WordbookSpacesMembersModule {}
