import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wordbook } from './wordbook.entity';

@Entity('wordbook_space', { schema: 'word_test_app' })
export class WordbookSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @ApiProperty({ example: 0, description: '공개 여부' })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Column('int', {
    name: 'visibility',
    nullable: false,
    default: 0 /* 0 비공개 1 일부 공개 2 공개 */,
  })
  visibility: number;

  @Column('varchar', { name: 'description', length: 100 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @OneToMany(() => Wordbook, (wordbook) => wordbook.WordbookSpace)
  Wordbooks: Wordbook[];
}
