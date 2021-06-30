import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
import { Users } from './Users';
import { Words } from './Words';

@Entity({ schema: 'word_test_app', name: 'wordbooks' })
export class WordBooks {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '내 단어장 1', description: '단어장 이름' })
  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @IsNumber()
  @Column('tinyint', {
    name: 'visibility',
    nullable: false,
    default: 0 /* 0 공개 1 비공개 */,
  })
  visibility: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (users) => users.WordBooks)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;

  @OneToMany(() => Words, (words) => words.WordBook)
  Words: Words[];
}
