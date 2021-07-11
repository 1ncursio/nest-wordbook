import { PickType } from '@nestjs/swagger';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';

export class CreateWordbookSpaceDto extends PickType(WordbookSpace, [
  'name',
  'shortBio',
  'visibility',
  'image',
] as const) {}
