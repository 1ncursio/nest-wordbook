import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Exams } from './Exams';
import { Words } from './Words';

@Entity('examwords', { schema: 'word_test_app' })
export class ExamWords {
  @Column('int', { primary: true, name: 'WordId' })
  WordId: number;

  @Column('int', { primary: true, name: 'ExamId' })
  ExamId: number;

  @Column('boolean', { name: 'isCorrect' })
  isCorrect: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Exams, (exams) => exams.Words)
  @JoinColumn([{ name: 'ExamId', referencedColumnName: 'id' }])
  Exam: Exams;

  @ManyToOne(() => Words, (words) => words.Exams)
  @JoinColumn([{ name: 'WordId', referencedColumnName: 'id' }])
  Word: Words;
}
