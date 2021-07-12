import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JoinGoogleUserDto } from './dto/join-google-user.dto';
import { JoinUserDto } from './dto/join-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      // select: ['id', 'email', 'password'],
    });
  }

  async findOrCreate(joinGoogleUserDto: JoinGoogleUserDto) {
    const exUser = await this.userRepository.findOne({
      where: { email: joinGoogleUserDto.email },
    });
    if (exUser) return exUser;

    await this.userRepository.save({
      socialId: joinGoogleUserDto.socialId,
      email: joinGoogleUserDto.email,
      username: joinGoogleUserDto.username,
      image: joinGoogleUserDto.image,
      provider: joinGoogleUserDto.provider,
    });

    return this.userRepository.findOne({
      where: { email: joinGoogleUserDto.email },
    });
  }

  async join(joinUserDto: JoinUserDto) {
    const hashedPassword = await bcrypt.hash(joinUserDto.password, 9);

    await this.userRepository.save({
      email: joinUserDto.email,
      username: joinUserDto.username,
      password: hashedPassword,
    });

    return true;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 9);
    await this.userRepository.update(userId, { hashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'email',
        'username',
        'image',
        'enabled',
        'image',
        'provider',
        'createdAt',
        'updatedAt',
        'role',
        'hashedRefreshToken',
      ],
    });
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      const { hashedRefreshToken, ...withoutHashedRefreshTokenUser } = user;
      return withoutHashedRefreshTokenUser;
    }
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      hashedRefreshToken: null,
    });
  }
}
