import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { User } from 'src/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { JoinUserDto } from './dto/join.user.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getProfile(@User() user: Users) {
  //   return user || false;
  // }

  // @ApiOperation({ summary: '로그인' })
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@User() user: Users) {
  //   return this.authService.login(user);
  // }

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() data: JoinUserDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (user) {
      throw new ForbiddenException('이미 존재하는 유저입니다.');
    }
    const result = await this.usersService.join(
      data.email,
      data.nickname,
      data.password,
    );
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }
}
