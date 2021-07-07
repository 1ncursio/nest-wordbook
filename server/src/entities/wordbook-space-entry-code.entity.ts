import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WordbookSpace } from './wordbook-space.entity';

@Entity('wordbook_space_entry_codes', { schema: 'word_test_app' })
export class WordbookSpaceEntryCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'code', generated: 'uuid', unique: true })
  code: string;

  /* OneToOne에서는 자동으로 unique contraint 생성 */
  @Column('uuid', { name: 'wordbook_space_id' })
  WordbookSpaceId: string;

  @Column('datetime', { name: 'expires_at' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => WordbookSpace, (wordbookSpace) => wordbookSpace.EntryCode)
  @JoinColumn({ name: 'wordbook_space_id', referencedColumnName: 'id' })
  WordbookSpace: WordbookSpace;
}
