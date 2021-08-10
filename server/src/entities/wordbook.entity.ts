import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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

@Entity('wordbooks')
export class Wordbook {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid', { name: 'author_id' })
  AuthorId!: string;

  @Column('uuid', { name: 'wordbook_space_id' })
  WordbookSpaceId!: string;

  @ApiProperty({ example: '내 단어장 1', description: '단어장 이름' })
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name' })
  name!: string;

  @IsString()
  @Column('varchar', { name: 'image', length: 255, nullable: true })
  image?: string;

  @IsString()
  @ApiProperty({ description: '단어장 소개', example: '일본어 단어장입니다' })
  @Column('varchar', { name: 'short_bio', length: 100, nullable: true })
  shortBio?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.Wordbooks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
  Author!: User;

  @OneToMany(() => Word, (word) => word.Wordbook)
  Words!: Word[];

  @ManyToOne(() => WordbookSpace, (wordbookSpace) => wordbookSpace.Wordbooks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'wordbook_space_id', referencedColumnName: 'id' })
  WordbookSpace!: WordbookSpace;
}
