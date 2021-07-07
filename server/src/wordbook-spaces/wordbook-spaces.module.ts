import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordbookSpaceEntryCode } from 'src/entities/wordbook-space-entry-code.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from 'src/entities/wordbook-space-role.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { WordbookSpacesController } from './wordbook-spaces.controller';
import { WordbookSpacesService } from './wordbook-spaces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordbookSpaceEntryCode,
      WordbookSpaceMember,
      WordbookSpaceRole,
      WordbookSpace,
      Wordbook,
    ]),
  ],
  controllers: [WordbookSpacesController],
  providers: [WordbookSpacesService],
})
export class WordbookSpacesModule {}
