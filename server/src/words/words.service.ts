import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { Word } from 'src/entities/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { ReorderWordDto } from './dto/reorder-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wordbook)
    private wordbooksRepository: Repository<Wordbook>,
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
  ) {}

  async createWord(wordbookId: string, createWordDto: CreateWordDto) {
    const count = await this.wordsRepository.count({
      where: {
        WordbookId: wordbookId,
      },
    });

    return this.wordsRepository.save({
      ...createWordDto,
      WordbookId: wordbookId,
      rank: count + 1,
    });
  }

  async findAll(wordbookId: string) {
    const wordbook = await this.wordbooksRepository.findOne({
      where: { id: wordbookId },
    });
    if (!wordbook) {
      throw new NotFoundException('존재하지 않는 단어장입니다.');
    }

    return this.wordsRepository.find({ where: { WordbookId: wordbookId } });
  }

  async findOne(id: string) {
    return `This action returns a #${id} word`;
  }

  async update(
    wordbookId: string,
    wordId: string,
    updateWordDto: UpdateWordDto,
    userId: string,
  ) {
    const word = await this.wordsRepository.findOne({
      where: { WordbookId: wordbookId, id: wordId },
    });
    if (!word) {
      throw new NotFoundException('존재하지 않는 단어 혹은 단어장입니다.');
    }
    word.kanji = updateWordDto.kanji;
    word.hiragana = updateWordDto.hiragana;
    word.katakana = updateWordDto.katakana;
    word.korean = updateWordDto.korean;
    word.level = updateWordDto.level;

    return this.wordsRepository.save(word);
  }

  async remove(wordbookId: string, wordId: string) {
    const word = await this.wordsRepository.findOne({
      where: { WordbookId: wordbookId, id: wordId },
    });
    if (!word) {
      throw new NotFoundException('존재하지 않는 단어 혹은 단어장입니다.');
    }
    await this.wordsRepository.remove(word);

    return { id: wordId };
  }

  async reorderWord(
    wordbookId: string,
    wordId: string,
    reorderWordDto: ReorderWordDto,
  ) {}
}
