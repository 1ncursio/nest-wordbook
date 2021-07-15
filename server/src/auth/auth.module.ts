import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { WordbookSpaceMember } from 'src/entities/wordbook-space-member.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './github.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { JwtStrategy } from './jwt.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { LocalStrategy } from './local.strategy';
import { WordbookSpaceRoleGuard } from './wordbook-space-role.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User, WordbookSpaceMember]),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    GoogleStrategy,
    GithubStrategy,
    KakaoStrategy,
    WordbookSpaceRoleGuard,
  ],
  exports: [AuthService, WordbookSpaceRoleGuard],
  controllers: [AuthController],
})
export class AuthModule {}
