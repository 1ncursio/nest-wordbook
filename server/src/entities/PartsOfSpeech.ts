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
import { WordPartsOfSpeech } from './WordPartsOfSpeech';

@Entity('partsofspeech', { schema: 'word_test_app' })
export class PartsOfSpeech {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name', length: 10 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => WordPartsOfSpeech,
    (wordPartsOfSpeech) => wordPartsOfSpeech.PartOfSpeech,
  )
  Words: WordPartsOfSpeech[];
}
