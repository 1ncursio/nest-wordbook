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
import { Users } from './Users';

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

  @ManyToOne(() => Users, (users) => users.Exams)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
