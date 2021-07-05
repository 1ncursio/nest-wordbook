import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/user.entity';

export class JoinUserDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {}
