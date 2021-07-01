import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exams } from './Exams';
import { ExamWords } from './ExamWords';
import { WordBooks } from './WordBooks';
import { WordPartsOfSpeech } from './WordPartsOfSpeech';
import { WordSenses } from './WordSenses';

@Entity({ schema: 'word_test_app', name: 'words' })
export class Words {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { name: 'kanji' })
  kanji: string;

  @IsString()
  @Column('varchar', { name: 'hiragana' })
  hiragana: string;

  @IsString()
  @Column('varchar', { name: 'katakana' })
  katakana: string;

  @IsNumber()
  @Column('tinyint', { name: 'level' })
  level: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { name: 'WordBookId' })
  WordBookId: number;

  @ManyToOne(() => WordBooks, (wordBooks) => wordBooks.Words)
  @JoinColumn([{ name: 'WordBookId', referencedColumnName: 'id' }])
  WordBook: WordBooks;

  @OneToMany(() => WordSenses, (wordSenses) => wordSenses.Word)
  Senses: WordSenses[];

  @OneToMany(
    () => WordPartsOfSpeech,
    (wordPartsOfSpeech) => wordPartsOfSpeech.Word,
  )
  PartsOfSpeech: WordPartsOfSpeech[];

  @OneToMany(() => ExamWords, (examWords) => examWords.Word)
  Exams: Exams[];
}
