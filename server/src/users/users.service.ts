import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JoinOAuthUserDto } from './dto/join-google-user.dto';
import { JoinUserDto } from './dto/join-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmailWithPassword(email: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.provider = :provider', { provider: 'local' })
      .addSelect('user.password')
      .getOne();
  }

  async findOrCreate(joinOAuthUserDto: JoinOAuthUserDto) {
    const exUser = await this.userRepository.findOne({
      where: {
        email: joinOAuthUserDto.email,
        provider: joinOAuthUserDto.provider,
      },
    });
    if (exUser) return exUser;

    await this.userRepository.save(
      {
        socialId: joinOAuthUserDto.socialId,
        email: joinOAuthUserDto.email,
        username: joinOAuthUserDto.username,
        image: joinOAuthUserDto.image,
        provider: joinOAuthUserDto.provider,
      },
      { reload: false },
    );

    return this.userRepository.findOne({
      where: {
        email: joinOAuthUserDto.email,
        provider: joinOAuthUserDto.provider,
      },
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

  async updateUserProfile(
    updateUserProfileDto: UpdateUserProfileDto,
    userId: string,
  ) {
    await this.userRepository.update(userId, {
      username: updateUserProfileDto.username,
      shortBio: updateUserProfileDto.shortBio,
    });

    return this.userRepository.findOne(userId, {
      select: ['id', 'username', 'shortBio'],
    });
  }

  async updateUserImage(file: Express.Multer.File, userId: string) {
    await this.userRepository.update(userId, { image: file.filename });

    return this.userRepository.findOne(userId, {
      select: ['id', 'image'],
    });
  }

  async deleteUserImage(userId: string) {
    await this.userRepository.update(userId, { image: null });

    return true;
  }
}
