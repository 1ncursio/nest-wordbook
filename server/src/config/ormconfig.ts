import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { ExamWord } from '../entities/exam-word.entity';
import { Exam } from '../entities/exam.entity';
import { PartOfSpeech } from '../entities/part-of-speech.entity';
import { User } from '../entities/user.entity';
import { WordPartOfSpeech } from '../entities/word-part-of-speech.entity';
import { WordSense } from '../entities/word-sense.entity';
import { Word } from '../entities/word.entity';
import { WordbookSpaceEntryCode } from '../entities/wordbook-space-entry-code.entity';
import { WordbookSpaceMember } from '../entities/wordbook-space-member.entity';
import { WordbookSpaceRole } from '../entities/wordbook-space-role.entity';
import { WordbookSpace } from '../entities/wordbook-space.entity';
import { Wordbook } from '../entities/wordbook.entity';

dotenv.config({ path: '.env.development' });
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

export default config;
