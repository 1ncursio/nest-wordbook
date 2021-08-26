import { PickType } from '@nestjs/swagger';
import { Word } from 'src/entities/word.entity';

export class CreateWordDto extends PickType(Word, [
  'kanji',
  'hiragana',
  'katakana',
  'level',
] as const) {}
