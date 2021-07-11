import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberGuard {
  constructor(
    @InjectRepository(WordbookSpaceMember)
    private wordbookSpaceMemberRepository: Repository<WordbookSpaceMember>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const { id: userId } = user as User;
    const { wordbookSpaceId } = request.params;

    const member = await this.wordbookSpaceMemberRepository
      .createQueryBuilder('member')
      .where('member.MemberId = :userId', { userId })
      .andWhere('member.WordbookSpaceId = :wordbookSpaceId', {
        wordbookSpaceId,
      })
      .getOne();

    return !!member;
  }
}
