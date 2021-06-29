import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
  getUser(@User() user: Users) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @Post()
  async join(@Body() data: JoinUserDto) {
    await this.usersService.join(data.email, data.nickname, data.password);
  }
}
