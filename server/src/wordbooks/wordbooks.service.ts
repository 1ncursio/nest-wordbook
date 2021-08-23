import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { Repository } from 'typeorm';
import { CreateWordbookDto } from './dto/create-word-book.dto';

@Injectable()
export class WordbooksService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wordbook)
    private wordbooksRepository: Repository<Wordbook>,
  ) {}

  // async findWordbooks() {
  //   return this.wordbooksRepository.find({ order: { createdAt: 'DESC' } });
  // }

  async findOneWordbook(wordbookId: string) {
    try {
      const wordbook = await this.wordbooksRepository
        .createQueryBuilder('wordbook')
        .where('wordbook.id = :wordbookId', { wordbookId })
        .leftJoinAndSelect('wordbook.Author', 'author')
        .leftJoinAndSelect('wordbook.Words', 'words')
        .getOne();

      if (!wordbook) {
        throw new NotFoundException('존재하지 않는 단어장입니다.');
      }

      return wordbook;
    } catch (error) {
      console.error(error);
    }
  }

  async createWordbook(createWordbookDto: CreateWordbookDto, userId: string) {
    const wordbook = new Wordbook();
    wordbook.name = createWordbookDto.name;
    // wordbook.OwnerId = userId;

    return this.wordbooksRepository.save(wordbook);
  }

  async updateWordbook() {
    // this.wordbooksRepository.update();
    throw new Error('Method not implemented.');
  }

  async deleteWordbook() {
    throw new Error('Method not implemented.');
  }
}
