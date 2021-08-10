import { IsString } from 'class-validator';
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

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsString()
  @Column('varchar', { name: 'name' })
  name!: string;

  @Column('tinyint', { name: 'min_level' })
  minLevel!: number;

  @Column('tinyint', { name: 'max_level' })
  maxLevel!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column('uuid', { name: 'user_id' })
  UserId!: string;

  @ManyToOne(() => User, (user) => user.Exams)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  Examinee!: User;

  @OneToMany(() => ExamWord, (examWord) => examWord.Exam)
  Words!: ExamWord[];
}
