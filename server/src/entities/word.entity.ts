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
import { Exam } from './exam.entity';
import { ExamWord } from './exam-word.entity';
import { WordBook } from './wordbook.entity';
import { WordPartOfSpeech } from './word-part-of-speech.entity';
import { WordSense } from './word-sense.entity';

@Entity('words', { schema: 'word_test_app' })
export class Word {
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @Column('int', { name: 'wordbook_id' })
  WordBookId: number;

  @ManyToOne(() => WordBook, (wordBooks) => wordBooks.Words)
  @JoinColumn([{ name: 'wordbook_id', referencedColumnName: 'id' }])
  WordBook: WordBook;

  @OneToMany(() => WordSense, (wordSenses) => wordSenses.Word)
  Senses: WordSense[];

  @OneToMany(
    () => WordPartOfSpeech,
    (wordPartsOfSpeech) => wordPartsOfSpeech.Word,
  )
  PartsOfSpeech: WordPartOfSpeech[];

  @OneToMany(() => ExamWord, (examWords) => examWords.Word)
  Exams: Exam[];
}
