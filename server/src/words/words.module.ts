import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordBook } from 'src/entities/wordbook.entity';
import { Word } from 'src/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WordBook, Word])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
