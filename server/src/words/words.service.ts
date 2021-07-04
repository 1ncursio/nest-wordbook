import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { WordBooks } from 'src/entities/WordBooks';
import { Words } from 'src/entities/Words';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(WordBooks)
    private wordBooksRepository: Repository<WordBooks>,
    @InjectRepository(Words) private wordsRepository: Repository<Words>,
  ) {}

  async create(createWordDto: CreateWordDto) {
    return 'This action adds a new word';
  }

  async findAll(wordBookId: number) {
    const wordBook = await this.wordBooksRepository.findOne({
      where: { id: wordBookId },
    });
    if (!wordBook) {
      throw new NotFoundException('존재하지 않는 단어장입니다.');
    }

    return this.wordsRepository.find({ where: { WordBookId: wordBookId } });
  }

  async findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  async remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
