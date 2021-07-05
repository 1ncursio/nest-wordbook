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
import { ExamWords } from './exam-word.entity';
import { Users } from './user.entity';

@Entity({ schema: 'word_test_app', name: 'exams' })
export class Exams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('tinyint', { name: 'minLevel' })
  minLevel: number;

  @Column('tinyint', { name: 'maxLevel' })
  maxLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { name: 'UserId' })
  UserId: number;

  @ManyToOne(() => Users, (users) => users.Exams)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  Examinee: Users;

  @OneToMany(() => ExamWords, (examWords) => examWords.Exam)
  Words: ExamWords[];
}
