import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WordbookSpaceMember } from './wordbook-space-member.entity';
import { WordbookSpaceRole } from './wordbook-space-role.entity';
import { Wordbook } from './wordbook.entity';

@Entity('wordbook_space', { schema: 'word_test_app' })
export class WordbookSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @ApiProperty({ example: 0, description: '공개 여부' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['public', 'limited', 'private'])
  @Column('varchar', {
    name: 'visibility',
    nullable: false,
  })
  visibility: number;

  @IsString()
  @Column('varchar', { name: 'image', length: 255 })
  image: string | null;

  @IsString()
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

  @OneToMany(
    () => WordbookSpaceMember,
    (wordbookSpaceMember) => wordbookSpaceMember.WordbookSpace,
  )
  Members: WordbookSpaceMember[];

  @OneToMany(
    () => WordbookSpaceRole,
    (wordbookSpaceRole) => wordbookSpaceRole.WordbookSpace,
  )
  Roles: WordbookSpaceRole[];
}
