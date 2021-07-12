import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }

  async googleLogin(user: User) {
    const exUser = await this.usersService.findByEmail(user.email);

    if (exUser) {
      const accessTokenCookie = this.getCookieWithJwtToken(exUser.id);
      const refreshToken = this.getCookieWithJwtRefreshToken(exUser.id);
      await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    }

    const newUser = await this.userRepository.save({
      email: user.email,
      username: user.username,
      image: user.image,
      provider: 'google',
      socialId: user.id,
    });

    return this.getCookieWithJwtToken(newUser.id);
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get<number>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    /* const cookie = `${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`; */
    return token;
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get<number>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    /* const cookie = `${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`; */
    // return { cookie, token };
    return token;
  }
}
