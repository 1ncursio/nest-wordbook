import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { WordBooks } from 'src/entities/WordBooks';
import { Repository } from 'typeorm';

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

  async createWordBook(name: string, visibility: number, userId: number) {
    const wordBook = new WordBooks();
    console.log(name, visibility, userId);
    wordBook.name = name;
    wordBook.visibility = visibility;
    wordBook.OwnerId = userId;

    await this.wordBooksRepository.save(wordBook);
  }

  async updateWordBook() {
    throw new Error('Method not implemented.');
  }

  async deleteWordBook() {
    throw new Error('Method not implemented.');
  }
}
