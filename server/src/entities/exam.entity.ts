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
import { ExamWord } from './exam-word.entity';
import { User } from './user.entity';

@Entity('exams', { schema: 'word_test_app' })
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('tinyint', { name: 'min_level' })
  minLevel: number;

  @Column('tinyint', { name: 'max_level' })
  maxLevel: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @Column('uuid', { name: 'user_id' })
  UserId: string;

  @ManyToOne(() => User, (users) => users.Exams)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  Examinee: User;

  @OneToMany(() => ExamWord, (examWords) => examWords.Exam)
  Words: ExamWord[];
}
