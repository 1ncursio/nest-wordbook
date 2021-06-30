import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WordBooks } from './WordBooks';

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

  @IsString()
  @Column('varchar', { name: 'korean' })
  korean: string;

  @IsNumber()
  @Column('tinyint', { name: 'level' })
  level: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => WordBooks, (wordBooks) => wordBooks.Words)
  @JoinColumn([{ name: 'WordBookId', referencedColumnName: 'id' }])
  WordBook: WordBooks;
}
