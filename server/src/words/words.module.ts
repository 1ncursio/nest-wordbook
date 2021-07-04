import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { WordBooks } from 'src/entities/WordBooks';
import { Words } from 'src/entities/Words';

@Module({
  imports: [TypeOrmModule.forFeature([Users, WordBooks, Words])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
