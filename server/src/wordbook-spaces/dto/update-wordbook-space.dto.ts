import { PartialType } from '@nestjs/swagger';
import { CreateWordbookSpaceDto } from './create-wordbook-space.dto';

export class UpdateWordbookSpaceDto extends PartialType(
  CreateWordbookSpaceDto,
) {}
