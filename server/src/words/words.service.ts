import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordBook } from 'src/entities/wordbook.entity';
import { Word } from 'src/entities/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(WordBook)
    private wordBooksRepository: Repository<WordBook>,
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
  ) {}

  async create(
    wordBookId: number,
    createWordDto: CreateWordDto,
    userId: number,
  ) {
    const word = await this.wordsRepository.findOne({
      where: { WordBookId: wordBookId, OwnerId: userId },
    });
    if (!word) {
      throw new NotFoundException('존재하지 않는 단어장입니다.');
    }
    word.kanji = createWordDto.kanji;
    word.hiragana = createWordDto.hiragana;
    word.katakana = createWordDto.katakana;

    return this.wordsRepository.save(word);
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

  async update(
    wordBookId: number,
    wordId: number,
    updateWordDto: UpdateWordDto,
    userId: number,
  ) {
    const word = await this.wordsRepository.findOne({
      where: { WordBookId: wordBookId, id: wordId, OwnerId: userId },
    });
    if (!word) {
      throw new NotFoundException('존재하지 않는 단어 혹은 단어장입니다.');
    }
    word.kanji = updateWordDto.kanji;
    word.hiragana = updateWordDto.hiragana;
    word.katakana = updateWordDto.katakana;

    return this.wordsRepository.save(word);
  }

  async remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
