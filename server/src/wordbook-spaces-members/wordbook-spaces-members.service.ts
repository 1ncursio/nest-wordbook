import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { Connection, Repository } from 'typeorm';
import { CreateWordbookSpacesMemberDto } from './dto/create-wordbook-spaces-member.dto';
import { UpdateWordbookSpacesMemberDto } from './dto/update-wordbook-spaces-member.dto';

@Injectable()
export class WordbookSpacesMembersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(WordbookSpace)
    private wordbookSpaceRepository: Repository<WordbookSpace>,
    @InjectRepository(WordbookSpaceMember)
    private wordbookSpaceMemberRepository: Repository<WordbookSpaceMember>,
  ) {}

  async enterMemberIntoWordbookSpace(
    createWordbookSpacesMemberDto: CreateWordbookSpacesMemberDto,
    userId: string,
  ) {
    const { WordbookSpaceId: wordbookSpaceId } = createWordbookSpacesMemberDto;
    const wordbookSpace = await this.wordbookSpaceRepository
      .createQueryBuilder('space')
      .where('space.id = :wordbookSpaceId', { wordbookSpaceId })
      .getOne();

    if (!wordbookSpace) {
      throw new NotFoundException('존재하지 않는 단어장 공간입니다.');
    }

    return this.wordbookSpaceMemberRepository.save({
      MemberId: userId,
      WordbookSpaceId: wordbookSpaceId,
    });
  }

  async findAllMembersInWordbookSpace(wordbookSpaceId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.WordbookSpaceMembers', 'members')
      .innerJoin(
        'members.WordbookSpace',
        'space',
        'space.id = :wordbookSpaceId',
        { wordbookSpaceId },
      )
      .getMany();
  }

  findOne(wordbookSpaceId: string, memberId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :memberId', { memberId })
      .innerJoin('user.WordbookSpaceMembers', 'members')
      .innerJoin(
        'members.WordbookSpace',
        'space',
        'space.id = :wordbookSpaceId',
        { wordbookSpaceId },
      )
      .getOne();
  }

  update(
    id: string,
    updateWordbookSpacesMemberDto: UpdateWordbookSpacesMemberDto,
  ) {
    return `This action updates a #${id} wordbookSpacesMember`;
  }

  remove(id: string) {
    return `This action removes a #${id} wordbookSpacesMember`;
  }
}
