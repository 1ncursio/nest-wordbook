import { IsBoolean } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { Word } from './word.entity';

@Entity('exam_words')
export class ExamWord {
  @Column('uuid', { primary: true, name: 'word_id' })
  WordId!: string;

  @Column('uuid', { primary: true, name: 'exam_id' })
  ExamId!: string;

  @IsBoolean()
  @Column('boolean', { name: 'is_correct' })
  isCorrect!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => Exam, (exam) => exam.Words)
  @JoinColumn([{ name: 'exam_id', referencedColumnName: 'id' }])
  Exam!: Exam;

  @ManyToOne(() => Word, (word) => word.Exams)
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  Word!: Word;
}
