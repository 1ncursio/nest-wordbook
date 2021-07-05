import { PickType } from '@nestjs/swagger';
import { WordBooks } from 'src/entities/wordbook.entity';

export class UpdateWordBookDto extends PickType(WordBooks, [
  'id',
  'name',
  'visibility',
] as const) {}
