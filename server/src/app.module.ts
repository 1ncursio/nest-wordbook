import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Exams } from './entities/Exams';
import { ExamWords } from './entities/ExamWords';
import { PartsOfSpeech } from './entities/PartsOfSpeech';
import { Users } from './entities/Users';
import { WordBooks } from './entities/WordBooks';
import { WordPartsOfSpeech } from './entities/WordPartsOfSpeech';
import { Words } from './entities/Words';
import { WordSenses } from './entities/WordSenses';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WordbooksModule } from './wordbooks/wordbooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Users,
        WordBooks,
        Words,
        Exams,
        ExamWords,
        WordSenses,
        PartsOfSpeech,
        WordPartsOfSpeech,
      ],
      // synchronize: false,
      synchronize: true,
      logging: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UsersModule,
    WordbooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
