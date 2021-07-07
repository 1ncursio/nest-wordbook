import { PartialType } from '@nestjs/swagger';
import { CreateWordbookSpacesMemberDto } from './create-wordbook-spaces-member.dto';

export class UpdateWordbookSpacesMemberDto extends PartialType(CreateWordbookSpacesMemberDto) {}
