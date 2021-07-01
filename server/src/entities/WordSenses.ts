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
import { Words } from './Words';

@Entity('wordsenses', { schema: 'word_test_app' })
export class WordSenses {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'definition', length: 100 })
  definition: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { name: 'WordId' })
  WordId: number;

  @ManyToOne(() => Words, (words) => words.Senses)
  @JoinColumn([{ name: 'WordId', referencedColumnName: 'id' }])
  Word: Words;
}
