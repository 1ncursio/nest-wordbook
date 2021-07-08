import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { Repository } from 'typeorm';
import {
  RequiredWordbookSpaceRole,
  WORDBOOK_SPACE_ROLES_KEY,
} from './wordbook-space-role.decorator';

@Injectable()
export class WordbookSpaceRoleGuard {
  constructor(
    private reflector: Reflector,
    @InjectRepository(WordbookSpaceMember)
    private wordbookSpaceMember: Repository<WordbookSpaceMember>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    const { id: userId } = user;
    const { wordbookSpaceId } = request.params;

    const requiredRole = this.reflector.get<RequiredWordbookSpaceRole>(
      WORDBOOK_SPACE_ROLES_KEY,
      context.getHandler(),
    );

    const member = await this.wordbookSpaceMember
      .createQueryBuilder('member')
      .where('member.MemberId = :userId', { userId })
      .andWhere('member.WordbookSpaceId = :wordbookSpaceId', {
        wordbookSpaceId,
      })
      .innerJoinAndSelect('member.Role', 'role')
      .getOne();

    return Object.keys(requiredRole).every(
      (role: keyof RequiredWordbookSpaceRole) => member.Role[role] === true,
    );
  }
}
