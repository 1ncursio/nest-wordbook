import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WordbookSpacesMembersModule } from './wordbook-spaces-members/wordbook-spaces-members.module';
import { WordbookSpacesModule } from './wordbook-spaces/wordbook-spaces.module';
import { WordbooksModule } from './wordbooks/wordbooks.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    WordbooksModule,
    WordsModule,
    WordbookSpacesModule,
    WordbookSpacesMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
