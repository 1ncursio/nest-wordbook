import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { GithubAuthGuard } from './github-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { KakaoAuthGuard } from './kakao-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.authService.getCookieWithJwtToken(user.id);
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(user.id);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME') *
        1000,
    });
    response.setHeader('Authorization', `Bearer ${accessToken}`);

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') *
        1000,
    });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@UserDecorator() user: User) {
    /* const { deletedAt, ...userData } = user;
    return userData; */
    return user;
  }

  @UseGuards(NotLoggedInGuard)
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth() {}

  @UseGuards(NotLoggedInGuard)
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.authService.getCookieWithJwtToken(user.id);
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(user.id);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME') *
        1000,
    });
    response.setHeader('Authorization', `Bearer ${accessToken}`);

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') *
        1000,
    });

    return user;
  }

  @UseGuards(NotLoggedInGuard)
  @UseGuards(GithubAuthGuard)
  @Get('github')
  async githubAuth() {}

  @UseGuards(NotLoggedInGuard)
  @UseGuards(GithubAuthGuard)
  @Get('github/redirect')
  async githubAuthRedirect(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.authService.getCookieWithJwtToken(user.id);
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(user.id);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME') *
        1000,
    });
    response.setHeader('Authorization', `Bearer ${accessToken}`);

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') *
        1000,
    });

    return user;
  }

  @UseGuards(NotLoggedInGuard)
  @UseGuards(KakaoAuthGuard)
  @Get('kakao')
  async kakaoAuth() {}

  @UseGuards(NotLoggedInGuard)
  @UseGuards(KakaoAuthGuard)
  @Get('kakao/redirect')
  async kakaoAuthRedirect(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.authService.getCookieWithJwtToken(user.id);
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(user.id);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME') *
        1000,
    });
    response.setHeader('Authorization', `Bearer ${accessToken}`);

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') *
        1000,
    });

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.authService.getCookieWithJwtToken(user.id);

    response.setHeader('Authorization', `Bearer ${accessToken}`);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge:
        this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME') *
        1000,
    });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('Authentication', null, {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
    response.cookie('Refresh', null, {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return true;
  }
}
