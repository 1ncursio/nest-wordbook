import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class JoinUserDto extends PickType(User, [
  'email',
  'username',
  'password',
] as const) {}
