import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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

  @Get()
  getProfile(@User() user: Users) {
    return user || false;
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: Users) {
    return user;
  }

  @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() data: JoinUserDto) {
    await this.usersService.join(data.email, data.nickname, data.password);
  }
}
