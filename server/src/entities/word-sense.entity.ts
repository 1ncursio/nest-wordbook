import { IsNotEmpty, IsString } from 'class-validator';
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
import { Word } from './word.entity';

@Entity('word_senses', { schema: 'word_test_app' })
export class WordSense {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'definition', length: 100 })
  definition: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @Column('int', { name: 'word_id' })
  WordId: number;

  @ManyToOne(() => Word, (words) => words.Senses)
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  Word: Word;
}
