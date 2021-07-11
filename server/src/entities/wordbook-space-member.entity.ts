import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WordbookSpaceRole } from './wordbook-space-role.entity';
import { WordbookSpace } from './wordbook-space.entity';

@Entity('wordbook_space_members', { schema: 'word_test_app' })
export class WordbookSpaceMember {
  @Column('uuid', { primary: true, name: 'wordbook_space_id' })
  WordbookSpaceId!: string;

  @Column('uuid', { primary: true, name: 'member_id' })
  MemberId!: string;

  @Column('uuid', { name: 'role_id', nullable: true })
  RoleId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.WordbookSpaceMembers)
  @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
  Member!: User;

  @ManyToOne(() => WordbookSpace, (wordbookSpace) => wordbookSpace.Members, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'wordbook_space_id', referencedColumnName: 'id' })
  WordbookSpace!: WordbookSpace;

  @ManyToOne(
    () => WordbookSpaceRole,
    (wordbookSpaceRole) => wordbookSpaceRole.Members,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  Role!: WordbookSpaceRole;
}
