import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { WordBooks } from 'src/entities/wordbook.entity';
import { Words } from 'src/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, WordBooks, Words])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
