import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { ExamWord } from './src/entities/exam-word.entity';
import { Exam } from './src/entities/exam.entity';
import { PartOfSpeech } from './src/entities/part-of-speech.entity';
import { User } from './src/entities/user.entity';
import { WordPartOfSpeech } from './src/entities/word-part-of-speech.entity';
import { WordSense } from './src/entities/word-sense.entity';
import { Word } from './src/entities/word.entity';
import { WordbookSpaceEntryCode } from './src/entities/wordbook-space-entry-code.entity';
import { WordbookSpaceMember } from './src/entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from './src/entities/wordbook-space-role.entity';
import { WordbookSpace } from './src/entities/wordbook-space.entity';
import { Wordbook } from './src/entities/wordbook.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Wordbook,
    Word,
    Exam,
    ExamWord,
    WordSense,
    PartOfSpeech,
    WordPartOfSpeech,
    WordbookSpace,
    WordbookSpaceMember,
    WordbookSpaceRole,
    WordbookSpaceEntryCode,
  ],
  migrations: [__dirname + '/./src/migrations/*.ts'],
  cli: { migrationsDir: './src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
};

export = config;
