import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { Repository, Transaction } from 'typeorm';
import { CreateWordbookSpaceDto } from './dto/create-wordbook-space.dto';
import { UpdateWordbookSpaceDto } from './dto/update-wordbook-space.dto';

@Injectable()
export class WordbookspacesService {
  constructor(
    @InjectRepository(WordbookSpace)
    private wordbookSpaceRepository: Repository<WordbookSpace>,
  ) {}

  @Transaction()
  create(createWordbookSpaceDto: CreateWordbookSpaceDto, userId: string) {
    const wordbookSpace = new WordbookSpace();
    console.log(createWordbookSpaceDto);
    wordbookSpace.name = createWordbookSpaceDto.name;
    wordbookSpace.visibility = createWordbookSpaceDto.visibility;
    wordbookSpace.description = createWordbookSpaceDto.description;
    wordbookSpace.OwnerId = userId;
    // wordbookSpace.image = createWordbookSpaceDto.image;

    /* need transaction => wordbook_member, default wordbook, default wordbook_role */

    return this.wordbookSpaceRepository.save(wordbookSpace);
  }

  findAll() {
    return `This action returns all wordbookspaces`;
  }

  findOne(id: string) {
    return `This action returns a #${id} wordbookspace`;
  }

  update(
    id: string,
    updateWordbookSpaceDto: UpdateWordbookSpaceDto,
    userId: string,
  ) {
    return `This action updates a #${id} wordbookspace`;
  }

  remove(id: string, userId: string) {
    return `This action removes a #${id} wordbookspace`;
  }
}
