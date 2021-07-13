import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class JoinOAuthUserDto extends PickType(User, [
  'email',
  'username',
  'image',
  'provider',
  'socialId',
] as const) {}
