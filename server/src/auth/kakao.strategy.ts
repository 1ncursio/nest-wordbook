import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyFunction } from 'passport-kakao';
import { JoinOAuthUserDto } from 'src/users/dto/join-google-user.dto';
import { UsersService } from 'src/users/users.service';

interface KakaoProfile extends Profile {
  provider: 'local' | 'google' | 'kakao' | 'github';
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'http://localhost:3095/auth/kakao/redirect',
    });
  }

  validate: VerifyFunction = async (
    accessToken,
    refreshToken,
    profile: KakaoProfile,
    done,
  ) => {
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
  };
}
