import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WordbookSpaceMember } from './wordbook-space-member.entity';
import { WordbookSpace } from './wordbook-space.entity';

@Entity('wordbook_space_roles', { schema: 'word_test_app' })
export class WordbookSpaceRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name', unique: true, length: 20 })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column('boolean', { name: 'can_create' })
  canCreate: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column('boolean', { name: 'can_update' })
  canUpdate: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column('boolean', { name: 'can_delete' })
  canDelete: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column('boolean', { name: 'can_invite' })
  canInvite: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column('boolean', { name: 'can_kick' })
  canKick: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column('boolean', { name: 'can_grant' })
  canGrant: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @Column('uuid', { name: 'wordbook_space_id' })
  WordbookSpaceId: string;

  @ManyToOne(() => WordbookSpace, (wordbookSpace) => wordbookSpace.Roles)
  WordbookSpace: WordbookSpace;

  @OneToMany(
    () => WordbookSpaceMember,
    (wordbookSpaceMember) => wordbookSpaceMember.Role,
  )
  Members: WordbookSpaceMember[];
}
