import {
  Body,
  Controller,
  ForbiddenException,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { JoinUserDto } from './dto/join-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() joinUserDto: JoinUserDto) {
    const user = await this.usersService.findByEmailWithPassword(
      joinUserDto.email,
    );
    if (user) {
      throw new ForbiddenException('이미 존재하는 유저입니다.');
    }
    const result = await this.usersService.join(joinUserDto);
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  async updateUserProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @UserDecorator() user: User,
  ) {
    return this.usersService.updateUserProfile(updateUserProfileDto, user.id);
  }
}
