import { PickType } from '@nestjs/swagger';
import { WordBook } from 'src/entities/wordbook.entity';

export class UpdateWordBookDto extends PickType(WordBook, [
  'id',
  'name',
  'visibility',
] as const) {}
