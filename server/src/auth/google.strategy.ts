import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { JoinOAuthUserDto } from 'src/users/dto/join-google-user.dto';
import { UsersService } from 'src/users/users.service';

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
  ): Promise<void> {
    const { id, displayName, emails, photos, provider } = profile;

    const joinOAuthUserDto: JoinOAuthUserDto = {
      socialId: id,
      email: emails?.[0].value ?? null,
      username: displayName,
      image: photos?.[0].value ?? null,
      provider: provider,
    };

    const user = await this.usersService.findOrCreate(joinOAuthUserDto);

    done(null, user);
  }
}
