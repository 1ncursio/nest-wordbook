import { IsNumber, IsOptional, IsString } from 'class-validator';
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
import { Wordbook } from './wordbook.entity';
import { WordPartOfSpeech } from './word-part-of-speech.entity';
import { WordSense } from './word-sense.entity';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsString()
  @Column('varchar', { name: 'kanji' })
  kanji!: string;

  @IsString()
  @Column('varchar', { name: 'hiragana' })
  hiragana!: string;

  @IsString()
  @Column('varchar', { name: 'katakana' })
  katakana!: string;

  @IsOptional()
  @IsNumber()
  @Column('enum', {
    name: 'level',
    enum: ['N1', 'N2', 'N3', 'N4', 'N5'],
    nullable: true,
  })
  level?: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column('uuid', { name: 'wordbook_id' })
  WordbookId!: string;

  @ManyToOne(() => Wordbook, (wordbook) => wordbook.Words, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'wordbook_id', referencedColumnName: 'id' }])
  Wordbook!: Wordbook;

  @OneToMany(() => WordSense, (wordSense) => wordSense.Word)
  Senses!: WordSense[];

  @OneToMany(
    () => WordPartOfSpeech,
    (wordPartOfSpeech) => wordPartOfSpeech.Word,
  )
  PartsOfSpeech!: WordPartOfSpeech[];

  @OneToMany(() => ExamWord, (examWord) => examWord.Word)
  Exams!: Exam[];
}
