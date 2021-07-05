import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { WordBooks } from 'src/entities/wordbook.entity';
import { Repository } from 'typeorm';
import { CreateWordBookDto } from './dto/create-word-book.dto';

@Injectable()
export class WordbooksService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(WordBooks)
    private wordBooksRepository: Repository<WordBooks>,
  ) {}

  async findWordBooks() {
    return this.wordBooksRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneWordBook(wordBookId: number) {
    return this.wordBooksRepository.findOne({ where: { id: wordBookId } });
  }

  async createWordBook(createWordBookDto: CreateWordBookDto, userId: number) {
    const wordBook = new WordBooks();
    console.log(createWordBookDto);
    wordBook.name = createWordBookDto.name;
    wordBook.visibility = createWordBookDto.visibility;
    wordBook.OwnerId = userId;

    return this.wordBooksRepository.save(wordBook);
  }

  async updateWordBook() {
    // this.wordBooksRepository.update();
    throw new Error('Method not implemented.');
  }

  async deleteWordBook() {
    throw new Error('Method not implemented.');
  }
}
