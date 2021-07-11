import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JoinUserDto } from './dto/join-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async join(joinUserDto: JoinUserDto) {
    const hashedPassword = await bcrypt.hash(joinUserDto.password, 9);

    await this.usersRepository.save({
      email: joinUserDto.email,
      username: joinUserDto.username,
      password: hashedPassword,
    });

    return true;
  }
}
