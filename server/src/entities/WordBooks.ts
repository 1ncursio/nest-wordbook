import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
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

  @ApiProperty({ example: '내 단어장 1', description: '단어장 이름' })
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @ApiProperty({ example: 1, description: '공개 여부' })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Column('int', {
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

  @Column('int', { name: 'OwnerId' })
  OwnerId: number;

  @ManyToOne(() => Users, (users) => users.WordBooks)
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: Users;

  @OneToMany(() => Words, (words) => words.WordBook)
  Words: Words[];
}
