import { PickType } from '@nestjs/swagger';
import { WordbookSpace } from 'src/entities/wordbook-space.entity';

export class CreateWordbookSpaceDto extends PickType(WordbookSpace, [
  'name',
  'description',
  'visibility',
  'image',
] as const) {}
