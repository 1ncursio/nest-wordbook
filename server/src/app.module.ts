import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Exam } from './entities/exam.entity';
import { ExamWord } from './entities/exam-word.entity';
import { PartOfSpeech } from './entities/part-of-speech.entity';
import { User } from './entities/user.entity';
import { WordBook } from './entities/wordbook.entity';
import { WordPartOfSpeech } from './entities/word-part-of-speech.entity';
import { Word } from './entities/word.entity';
import { WordSense } from './entities/word-sense.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WordbooksModule } from './wordbooks/wordbooks.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        WordBook,
        Word,
        Exam,
        ExamWord,
        WordSense,
        PartOfSpeech,
        WordPartOfSpeech,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UsersModule,
    WordbooksModule,
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
