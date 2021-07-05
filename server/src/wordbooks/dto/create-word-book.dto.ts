import { PickType } from '@nestjs/swagger';
import { WordBook } from 'src/entities/wordbook.entity';

export class CreateWordBookDto extends PickType(WordBook, [
  'name',
  'visibility',
] as const) {}
