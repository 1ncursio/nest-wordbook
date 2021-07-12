import { Injectable } from '@nestjs/common';
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

  async findWordbooks() {
    return this.wordbooksRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneWordbook(wordbookId: number) {
    return this.wordbooksRepository.findOne({ where: { id: wordbookId } });
  }

  async createWordbook(createWordbookDto: CreateWordbookDto, userId: string) {
    const wordbook = new Wordbook();
    console.log(createWordbookDto);
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
