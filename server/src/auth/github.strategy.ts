import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { JoinOAuthUserDto } from 'src/users/dto/join-google-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3095/auth/github/redirect',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void,
  ) {
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
