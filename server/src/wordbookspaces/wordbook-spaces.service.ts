import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from 'src/entities/wordbook-space-role.entity';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';
import { Wordbook } from 'src/entities/wordbook.entity';
import { Connection, Repository } from 'typeorm';
import { inspect } from 'util';
import { CreateWordbookSpaceDto } from './dto/create-wordbook-space.dto';
import { UpdateWordbookSpaceDto } from './dto/update-wordbook-space.dto';

@Injectable()
export class WordbookspacesService {
  constructor(
    @InjectRepository(WordbookSpace)
    private wordbookSpaceRepository: Repository<WordbookSpace>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async create(createWordbookSpaceDto: CreateWordbookSpaceDto, userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    /* transaction => wordbook_space, wordbook_member, default wordbook, default wordbook_role */
    console.log(createWordbookSpaceDto);
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

      await queryRunner.manager.getRepository(WordbookSpaceMember).save({
        WordbookSpaceId: wordbookSpace.id,
        MemberId: userId,
        RoleId: adminRole.id,
      });

      await queryRunner.manager.getRepository(Wordbook).save({
        name: '첫 단어장',
        WordbookSpaceId: wordbookSpace.id,
      });

      await queryRunner.commitTransaction();
      return wordbookSpace;
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
      .getMany();
  }

  async findOneMyWordbookSpace(wordbookSpaceId: string, userId: string) {
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
    wordbookSpace.description = updateWordbookSpaceDto.description;
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
