import { PickType } from '@nestjs/swagger';
import { Wordbook } from 'src/entities/wordbook.entity';

export class CreateWordbookDto extends PickType(Wordbook, ['name'] as const) {}
