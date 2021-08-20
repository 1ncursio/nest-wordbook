import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import loggerConfig from './config/logger-config';
import ormconfig from './config/ormconfig';
import { DetectModule } from './detect/detect.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WordbookSpacesMembersModule } from './wordbook-spaces-members/wordbook-spaces-members.module';
import { WordbookSpacesModule } from './wordbook-spaces/wordbook-spaces.module';
import { WordbooksModule } from './wordbooks/wordbooks.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot(ormconfig),
    LoggerModule.forRoot(loggerConfig),
    AuthModule,
    UsersModule,
    WordbooksModule,
    WordsModule,
    WordbookSpacesModule,
    WordbookSpacesMembersModule,
    DetectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
