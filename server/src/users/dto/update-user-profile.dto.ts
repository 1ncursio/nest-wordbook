import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class UpdateUserProfileDto extends PickType(User, [
  'username',
  'shortBio',
] as const) {}
