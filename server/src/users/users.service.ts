import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async join(email: string, nickname: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 9);
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return false;
    }

    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });

    return true;
  }
}
