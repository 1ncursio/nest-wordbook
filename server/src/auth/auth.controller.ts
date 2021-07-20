import {
  Controller,
  Get,
  Post,
  Redirect,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { SetCookieInterceptor } from './set-cookie.interceptor';

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
    const accessToken = this.authService.getJwtAccessToken(user.id);
    const refreshToken = this.authService.getJwtRefreshToken(user.id);

    // response.cookie('Authentication', accessToken, {
    //   httpOnly: true,
    //   path: '/',
    //   sameSite: 'lax',
    //   maxAge:
    //     this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME') *
    //     1000,
    // });
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
    return user;
  }

  @UseGuards(NotLoggedInGuard, GoogleAuthGuard)
  @Get('google')
  async googleAuth() {}

  @UseInterceptors(SetCookieInterceptor)
  @UseGuards(NotLoggedInGuard, GoogleAuthGuard)
  @Redirect('http://localhost:3090/refresh', 301)
  @Get('google/redirect')
  async googleAuthRedirect(@UserDecorator() user: User) {
    const accessToken = this.authService.getJwtAccessToken(user.id);
    const refreshToken = this.authService.getJwtRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  @UseGuards(NotLoggedInGuard, GithubAuthGuard)
  @Get('github')
  async githubAuth() {}

  @UseInterceptors(SetCookieInterceptor)
  @UseGuards(NotLoggedInGuard, GithubAuthGuard)
  @Redirect('http://localhost:3090/refresh', 301)
  @Get('github/redirect')
  async githubAuthRedirect(@UserDecorator() user: User) {
    const accessToken = this.authService.getJwtAccessToken(user.id);
    const refreshToken = this.authService.getJwtRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  @UseGuards(NotLoggedInGuard, KakaoAuthGuard)
  @Get('kakao')
  async kakaoAuth() {}

  @UseInterceptors(SetCookieInterceptor)
  @UseGuards(NotLoggedInGuard, KakaoAuthGuard)
  @Redirect('http://localhost:3090/refresh', 301)
  @Get('kakao/redirect')
  async kakaoAuthRedirect(@UserDecorator() user: User) {
    const accessToken = this.authService.getJwtAccessToken(user.id);
    const refreshToken = this.authService.getJwtRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(
    @UserDecorator() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = this.authService.getJwtAccessToken(user.id);

    response.setHeader('Authorization', `Bearer ${accessToken}`);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) response: Response) {
    // response.cookie('Authentication', null, {
    //   httpOnly: true,
    //   path: '/',
    //   maxAge: 0,
    // });
    response.cookie('Refresh', null, {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return true;
  }
}
