import { PickType } from '@nestjs/swagger';
import { Wordbook } from 'src/entities/wordbook.entity';

export class UpdateWordbookDto extends PickType(Wordbook, [
  'id',
  'name',
  'visibility',
] as const) {}
