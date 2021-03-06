import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WordbookSpaceEntryCode } from './wordbook-space-entry-code.entity';
import { WordbookSpaceMember } from './wordbook-space-member.entity';
import { WordbookSpaceRole } from './wordbook-space-role.entity';
import { Wordbook } from './wordbook.entity';

@Entity('wordbook_spaces')
export class WordbookSpace {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid', { name: 'owner_id' })
  OwnerId!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '단어장 공간 이름', example: 'N1 단어장' })
  @Column('varchar', { name: 'name', length: 100 })
  name!: string;

  @ApiProperty({ description: '공개 여부', example: 'public' })
  @IsNotEmpty()
  @IsString()
  @Column('enum', {
    name: 'visibility',
    enum: ['public', 'limited', 'private'],
  })
  visibility!: 'public' | 'limited' | 'private';

  @ApiProperty({ description: '단어장 공간 썸네일', example: 'image.jpg' })
  @Column('varchar', { name: 'image', length: 255, nullable: true })
  image?: string;

  @IsString()
  @ApiProperty({
    description: '단어장 공간 소개',
    example: '일본어 단어장 공간입니다',
  })
  @Column('varchar', { name: 'short_bio', length: 100, nullable: true })
  shortBio?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.WordbookSpaces)
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  Owner!: User;

  @OneToMany(() => Wordbook, (wordbook) => wordbook.WordbookSpace)
  Wordbooks!: Wordbook[];

  @OneToMany(
    () => WordbookSpaceMember,
    (wordbookSpaceMember) => wordbookSpaceMember.WordbookSpace,
  )
  Members!: WordbookSpaceMember[];

  @OneToMany(
    () => WordbookSpaceRole,
    (wordbookSpaceRole) => wordbookSpaceRole.WordbookSpace,
  )
  Roles!: WordbookSpaceRole[];

  @OneToOne(
    () => WordbookSpaceEntryCode,
    (wordbookSpaceEntryCode) => wordbookSpaceEntryCode.WordbookSpace,
  )
  EntryCode!: WordbookSpaceEntryCode;
}
