import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WordPartOfSpeech } from './word-part-of-speech.entity';

@Entity('parts_of_speech')
export class PartOfSpeech {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name', unique: true, length: 10 })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(
    () => WordPartOfSpeech,
    (wordPartOfSpeech) => wordPartOfSpeech.PartOfSpeech,
  )
  Words!: WordPartOfSpeech[];
}
