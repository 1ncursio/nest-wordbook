import { PickType } from '@nestjs/swagger';
import { WordBooks } from 'src/entities/WordBooks';

export class UpdateWordBookDto extends PickType(WordBooks, [
  'id',
  'name',
  'visibility',
] as const) {}
