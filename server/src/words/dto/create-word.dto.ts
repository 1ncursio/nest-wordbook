import { PickType } from '@nestjs/swagger';
import { Words } from 'src/entities/word.entity';

export class CreateWordDto extends PickType(Words, [
  'kanji',
  'hiragana',
  'katakana',
] as const) {}
