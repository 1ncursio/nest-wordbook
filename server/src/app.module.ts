import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig';
import loggerConfig from './config/logger-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WordbookSpacesMembersModule } from './wordbook-spaces-members/wordbook-spaces-members.module';
import { WordbookSpacesModule } from './wordbook-spaces/wordbook-spaces.module';
import { WordbooksModule } from './wordbooks/wordbooks.module';
import { WordsModule } from './words/words.module';
import { LoggerModule } from 'nestjs-pino';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
