import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { WordBooks } from 'src/entities/WordBooks';
import { WordbooksController } from './wordbooks.controller';
import { WordbooksService } from './wordbooks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, WordBooks])],
  controllers: [WordbooksController],
  providers: [WordbooksService],
})
export class WordbooksModule {}
