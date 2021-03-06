import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { WordbooksController } from './wordbooks.controller';
import { WordbooksService } from './wordbooks.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wordbook, WordbookSpaceMember])],
  controllers: [WordbooksController],
  providers: [WordbooksService],
})
export class WordbooksModule {}
