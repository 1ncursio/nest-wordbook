import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { Word } from 'src/entities/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Wordbook)
    private wordbooksRepository: Repository<Wordbook>,
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
  ) {}

  async create(
    wordbookId: number,
    createWordDto: CreateWordDto,
    userId: string,
  ) {
    const word = await this.wordsRepository.findOne({
      where: { WordbookId: wordbookId, OwnerId: userId },
    });
    if (!word) {
      throw new NotFoundException('존재하지 않는 단어장입니다.');
    }
    word.kanji = createWordDto.kanji;
    word.hiragana = createWordDto.hiragana;
    word.katakana = createWordDto.katakana;

    return this.wordsRepository.save(word);
  }

  async findAll(wordbookId: number) {
    const wordbook = await this.wordbooksRepository.findOne({
      where: { id: wordbookId },
    });
    if (!wordbook) {
      throw new NotFoundException('존재하지 않는 단어장입니다.');
    }

    return this.wordsRepository.find({ where: { WordbookId: wordbookId } });
  }

  async findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  async update(
    wordbookId: number,
    wordId: number,
    updateWordDto: UpdateWordDto,
    userId: string,
  ) {
    const word = await this.wordsRepository.findOne({
      where: { WordbookId: wordbookId, id: wordId, OwnerId: userId },
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
