import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { WordbookSpaceEntryCode } from 'src/entities/wordbook-space-entry-code.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from 'src/entities/wordbook-space-role.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateWordbookSpaceDto } from './dto/create-wordbook-space.dto';
import { UpdateWordbookSpaceDto } from './dto/update-wordbook-space.dto';

@Injectable()
export class WordbookSpacesService {
  constructor(
    @InjectRepository(WordbookSpace)
    private wordbookSpaceRepository: Repository<WordbookSpace>,
    @InjectRepository(WordbookSpaceEntryCode)
    private wordbookSpaceEntryCodeRepository: Repository<WordbookSpaceEntryCode>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async create(createWordbookSpaceDto: CreateWordbookSpaceDto, userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    /* transaction => wordbook_space, wordbook_member, default wordbook, default wordbook_role */
    try {
      const wordbookSpace = await queryRunner.manager
        .getRepository(WordbookSpace)
        .save({ ...createWordbookSpaceDto, OwnerId: userId });

      const [adminRole, normalRole] = await queryRunner.manager
        .getRepository(WordbookSpaceRole)
        .save([
          {
            WordbookSpaceId: wordbookSpace.id,
            name: '관리자',
            canCreate: true,
            canUpdate: true,
            canDelete: true,
            canInvite: true,
            canKick: true,
            canGrant: true,
          },
          {
            WordbookSpaceId: wordbookSpace.id,
            name: '일반 멤버',
            canCreate: true,
            canUpdate: true,
            canDelete: true,
            canInvite: false,
            canKick: false,
            canGrant: false,
          },
        ]);

      await queryRunner.manager.getRepository(WordbookSpaceMember).save(
        {
          WordbookSpaceId: wordbookSpace.id,
          MemberId: userId,
          RoleId: adminRole.id,
        },
        { reload: false },
      );

      await queryRunner.manager.getRepository(Wordbook).save(
        {
          name: '첫 단어장',
          WordbookSpaceId: wordbookSpace.id,
          AuthorId: userId,
        },
        { reload: false },
      );

      await queryRunner.commitTransaction();
      return this.wordbookSpaceRepository
        .createQueryBuilder('wordbookSpace')
        .where('wordbookSpace.id = :wordbookSpaceId', {
          wordbookSpaceId: wordbookSpace.id,
        })
        .innerJoin(
          'wordbookSpace.Members',
          'members',
          'members.MemberId = :userId',
          { userId },
        )
        .innerJoinAndSelect('wordbookSpace.Owner', 'owner')
        .select(['wordbookSpace', 'owner.id', 'owner.username', 'owner.image'])
        .getOne();
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

  async generateEntryCode(wordbookSpaceId: string, userId: string) {
    const wordbookSpace = await this.wordbookSpaceRepository
      .createQueryBuilder('space')
      .where('space.id = :wordbookSpaceId', { wordbookSpaceId })
      .leftJoinAndSelect('space.EntryCode', 'entryCode')
      .getOne();

    if (!wordbookSpace) {
      throw new NotFoundException('존재하지 않는 단어장 공간입니다.');
    }

    /* entry code expires in 24 hours */
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000);

    if (wordbookSpace.EntryCode) {
      wordbookSpace.EntryCode.code = uuidv4();
      wordbookSpace.EntryCode.expiresAt = expiresAt;
      return this.wordbookSpaceEntryCodeRepository.save(
        wordbookSpace.EntryCode,
      );
    } else {
      return this.wordbookSpaceEntryCodeRepository.save({
        WordbookSpaceId: wordbookSpaceId,
        expiresAt: expiresAt,
      });
    }
  }

  async findAllMyWordbookSpaces(userId: string) {
    return this.wordbookSpaceRepository
      .createQueryBuilder('wordbookSpace')
      .innerJoin(
        'wordbookSpace.Members',
        'members',
        'members.MemberId = :userId',
        {
          userId,
        },
      )
      .innerJoinAndSelect('wordbookSpace.Owner', 'owner')
      .select(['wordbookSpace', 'owner.id', 'owner.username', 'owner.image'])
      .orderBy('wordbookSpace.createdAt', 'DESC')
      .getMany();
  }

  async findOneMyWordbookSpace(wordbookSpaceId: string, userId: string) {
    const wordbookSpace = await this.wordbookSpaceRepository
      .createQueryBuilder('wordbookSpace')
      .where('wordbookSpace.id = :wordbookSpaceId', { wordbookSpaceId })
      .innerJoin('wordbookSpace.Members', 'members')
      .innerJoinAndSelect('members.Member', 'member')
      .innerJoinAndSelect('wordbookSpace.Roles', 'roles')
      .innerJoinAndSelect('wordbookSpace.Owner', 'owner')
      .leftJoinAndSelect('wordbookSpace.Wordbooks', 'wordbooks')
      .leftJoinAndSelect('wordbooks.Author', 'author')
      .leftJoinAndSelect('wordbookSpace.EntryCode', 'entryCode')
      .select([
        'wordbookSpace',
        'roles',
        'members',
        'member',
        'owner.id',
        'owner.username',
        'owner.image',
        'wordbooks',
        'author.id',
        'author.username',
        'author.image',
        'entryCode',
      ])
      .orderBy('wordbookSpace.createdAt', 'DESC')
      .getOne();

    if (!wordbookSpace) {
      throw new NotFoundException('존재하지 않는 단어장 공간입니다.');
    }

    if (!wordbookSpace.Members.some((m) => m.MemberId === userId)) {
      throw new ForbiddenException('해당 단어장 공간의 멤버가 아닙니다.');
    }

    return wordbookSpace;
  }

  async update(
    wordbookSpaceId: string,
    updateWordbookSpaceDto: UpdateWordbookSpaceDto,
    userId: string,
  ) {
    const wordbookSpace = await this.wordbookSpaceRepository
      .createQueryBuilder('wordbookSpace')
      .where('wordbookSpace.id = :wordbookSpaceId', { wordbookSpaceId })
      .innerJoin(
        'wordbookSpace.Members',
        'members',
        'members.MemberId = :userId',
        { userId },
      )
      .getOne();

    if (!wordbookSpace) {
      throw new NotFoundException('존재하지 않는 단어장 공간입니다.');
    }

    wordbookSpace.name = updateWordbookSpaceDto.name;
    wordbookSpace.shortBio = updateWordbookSpaceDto.shortBio;
    wordbookSpace.visibility = updateWordbookSpaceDto.visibility;
    wordbookSpace.image = updateWordbookSpaceDto.image;

    await this.wordbookSpaceRepository.save(wordbookSpace);

    return wordbookSpace;
  }

  async removeMyWordbookSpace(wordbookSpaceId: string, userId: string) {
    /* 
      id가 wordbookSpaceId, OwnerId가 userId인 워드북 스페이스를 멤버랑 조인 후 조회
      만약 없다면 404, 있다면 남은 멤버가 자신 뿐인지 확인
      자신 뿐이라면 삭제, 아니라면 403
    */
    const wordbookSpace = await this.wordbookSpaceRepository
      .createQueryBuilder('wordbookSpace')
      .where('wordbookSpace.id = :wordbookSpaceId', { wordbookSpaceId })
      .andWhere('wordbookSpace.OwnerId = :userId', { userId })
      .innerJoinAndSelect('wordbookSpace.Members', 'members')
      .getOne();

    if (!wordbookSpace) {
      throw new NotFoundException('존재하지 않는 단어장 공간입니다.');
    }

    if (wordbookSpace.Members.length > 1) {
      throw new ForbiddenException(
        '멤버가 남아있는 단어장 공간은 지울 수 없습니다.',
      );
    }

    return this.wordbookSpaceRepository.remove(wordbookSpace);
  }
}
