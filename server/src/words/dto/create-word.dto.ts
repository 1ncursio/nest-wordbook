import { PickType } from '@nestjs/swagger';
import { Words } from 'src/entities/Words';

export class CreateWordDto extends PickType(Words, [
  'kanji',
  'hiragana',
  'katakana',
] as const) {}
