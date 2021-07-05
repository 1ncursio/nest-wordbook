import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { Wordbook } from './wordbook.entity';

@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'word_test_app' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: '1ncursio@gmail.com', description: '이메일' })
  @Column('varchar', {
    name: 'email',
    unique: true,
    length: 30,
    nullable: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1ncursio', description: '닉네임' })
  @Column('varchar', {
    name: 'nickname',
    length: 30,
    nullable: false,
  })
  nickname: string;

  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'nodejsbook', description: '비밀번호' })
  @Column('varchar', {
    name: 'password',
    length: 100,
    select: false,
    nullable: false,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'default', description: '권한' })
  @Column('varchar', { name: 'role', nullable: false, default: 'default' })
  role: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'image.jpg', description: '유저 이미지' })
  @Column('varchar', {
    name: 'image',
    length: 255,
    nullable: true,
  })
  image: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: '계정 사용가능 여부' })
  @Column('boolean', {
    name: 'enabled',
    nullable: false,
    default: true /* 이메일 인증 전까지 비활성화 해야됨 */,
  })
  enabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @OneToMany(() => Wordbook, (wordbooks) => wordbooks.Owner)
  Wordbooks: Wordbook[];

  @OneToMany(() => Exam, (exams) => exams.Examinee)
  Exams: Exam[];

  // @OneToMany(() => EmailVerifications)
}
