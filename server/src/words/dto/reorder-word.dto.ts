import { PickType } from '@nestjs/swagger';
import { Word } from 'src/entities/word.entity';

export class ReorderWordDto extends PickType(Word, ['rank'] as const) {}
