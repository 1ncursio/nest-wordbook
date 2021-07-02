import { PickType } from '@nestjs/swagger';
import { WordBooks } from 'src/entities/WordBooks';

export class CreateWordBookDto extends PickType(WordBooks, [
  'name',
  'visibility',
] as const) {}
