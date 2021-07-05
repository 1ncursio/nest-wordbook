import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Exams } from './entities/exam.entity';
import { ExamWords } from './entities/exam-word.entity';
import { PartsOfSpeech } from './entities/part-of-speech.entity';
import { Users } from './entities/user.entity';
import { WordBooks } from './entities/wordbook.entity';
import { WordPartsOfSpeech } from './entities/word-part-of-speech.entity';
import { Words } from './entities/word.entity';
import { WordSenses } from './entities/word-sense.entity';
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
        Users,
        WordBooks,
        Words,
        Exams,
        ExamWords,
        WordSenses,
        PartsOfSpeech,
        WordPartsOfSpeech,
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
