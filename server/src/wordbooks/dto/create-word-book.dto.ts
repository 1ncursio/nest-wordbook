import { PickType } from '@nestjs/swagger';
import { WordBooks } from 'src/entities/wordbook.entity';

export class CreateWordBookDto extends PickType(WordBooks, [
  'name',
  'visibility',
] as const) {}
