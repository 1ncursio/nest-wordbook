import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Word } from 'src/entities/word.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { Connection, Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { ReorderWordDto } from './dto/reorder-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Wordbook)
    private wordbooksRepository: Repository<Wordbook>,
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
    @InjectConnection()
    private connection: Connection,
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
      rank: count,
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
  ) {
    const { rank } = reorderWordDto;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const { rank: previousRank } = await queryRunner.manager
        .getRepository(Word)
        .createQueryBuilder('word')
        .where('id = :wordId', { wordId })
        .getOne();

      // 위에서 밑으로 재정렬시킬 경우
      if (previousRank < rank) {
        await queryRunner.manager
          .getRepository(Word)
          .createQueryBuilder('word')
          .update()
          .set({
            rank: () => '`rank` - 1',
          })
          .where('WordbookId = :wordbookId', { wordbookId })
          .andWhere('`rank` > :previousRank', { previousRank })
          .andWhere('`rank` <= :rank', { rank })
          .execute();
      }
      // 밑에서 위로 재정렬시킬 경우
      else if (previousRank > rank) {
        await queryRunner.manager
          .getRepository(Word)
          .createQueryBuilder('word')
          .update()
          .set({
            rank: () => '`rank` + 1',
          })
          .where('WordbookId = :wordbookId', { wordbookId })
          .andWhere('`rank` >= :rank', { rank })
          .andWhere('`rank` < :previousRank', { previousRank })
          .execute();
      }
      await queryRunner.manager
        .getRepository(Word)
        .createQueryBuilder('word')
        .update()
        .set({
          rank,
        })
        .where('id = :wordId', { wordId })
        .execute();

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        '트랜잭션 중 오류가 발생했습니다.',
      );
    } finally {
      await queryRunner.release();
    }
  }
}
