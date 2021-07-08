import { PickType } from '@nestjs/swagger';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';

export class CreateWordbookSpacesMemberDto extends PickType(
  WordbookSpaceMember,
  ['MemberId', 'WordbookSpaceId'] as const,
) {}
