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
import { User } from './user.entity';
import { Word } from './word.entity';
import { WordbookSpace } from './wordbook-space.entity';

@Entity('wordbooks', { schema: 'word_test_app' })
export class Wordbook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'wordbook_space_id' })
  WordbookSpaceId: string;

  @ApiProperty({ example: '내 단어장 1', description: '단어장 이름' })
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @IsString()
  @Column('varchar', { name: 'image', length: 255 })
  image: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @OneToMany(() => Word, (words) => words.Wordbook)
  Words: Word[];

  @ManyToOne(() => WordbookSpace, (wordbookSpace) => wordbookSpace.Wordbooks)
  @JoinColumn({ name: 'wordbook_space_id', referencedColumnName: 'id' })
  WordbookSpace: WordbookSpace;
}
