import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
import { WordbookSpaceMember } from './wordbook-space-member.entity';
import { WordbookSpace } from './wordbook-space.entity';

@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'word_test_app' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: '1ncursio@gmail.com', description: '이메일' })
  @Column('varchar', {
    name: 'email',
    unique: true,
    length: 30,
  })
  email!: string;

  @IsString()
  @ApiProperty({ example: '황현종', description: '닉네임' })
  @Column('varchar', {
    name: 'username',
    length: 20,
  })
  username!: string;

  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @ApiProperty({ example: 'nodejsbook', description: '비밀번호' })
  @Column('varchar', {
    name: 'password',
    length: 100,
    select: false,
    nullable: true,
  })
  password?: string;

  @Exclude()
  @ApiProperty({ example: 'agasjhaduiggaidu', description: '리프레시 토큰' })
  @Column('varchar', {
    name: 'hashed_refresh_token',
    select: false,
    nullable: true,
  })
  hashedRefreshToken?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'default', description: '권한' })
  @Column('varchar', { name: 'role', default: 'default' })
  role!: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'image.jpg',
    description: '유저 이미지',
    nullable: true,
  })
  @Column('varchar', {
    name: 'image',
    length: 255,
    nullable: true,
  })
  image?: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: '계정 사용가능 여부' })
  @Column('boolean', {
    name: 'enabled',
    default: true /* 이메일 인증 전까지 비활성화 해야됨 */,
  })
  enabled!: boolean;

  @Column('enum', {
    name: 'provider',
    enum: ['google', 'apple', 'kakao', 'local'],
  })
  provider!: 'google' | 'apple' | 'kakao' | 'local';

  @Column('varchar', {
    name: 'social_id',
    unique: true,
    length: 100,
    nullable: true,
  })
  socialId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => WordbookSpace, (wordbooks) => wordbooks.Owner)
  WordbookSpaces!: WordbookSpace[];

  @OneToMany(() => Exam, (exams) => exams.Examinee)
  Exams!: Exam[];

  @OneToMany(
    () => WordbookSpaceMember,
    (wordbookSpaceMember) => wordbookSpaceMember.Member,
  )
  WordbookSpaceMembers!: WordbookSpaceMember[];
}
