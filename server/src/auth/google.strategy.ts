import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from 'src/entities/user.entity';
import { JoinGoogleUserDto } from 'src/users/dto/join-google-user.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3095/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails, photos } = profile;

    const joinGoogleUserDto: JoinGoogleUserDto = {
      socialId: id,
      email: emails[0].value,
      username: displayName,
      image: photos[0].value ?? '',
      provider: 'google',
    };

    const user = await this.usersService.findOrCreate(joinGoogleUserDto);

    done(null, user);
  }
}
