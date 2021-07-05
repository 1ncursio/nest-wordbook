import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from 'src/entities/wordbook-space-role.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { WordbookspacesController } from './wordbook-spaces.controller';
import { WordbookspacesService } from './wordbook-spaces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordbookSpaceMember,
      WordbookSpaceRole,
      WordbookSpace,
      Wordbook,
    ]),
  ],
  controllers: [WordbookspacesController],
  providers: [WordbookspacesService],
})
export class WordbookspacesModule {}
