import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { PartOfSpeech } from './part-of-speech.entity';
import { Word } from './word.entity';

@Entity('word_parts_of_speech', { schema: 'word_test_app' })
export class WordPartOfSpeech {
  @Column('int', { primary: true, name: 'word_id' })
  WordId: number;

  @Column('int', { primary: true, name: 'part_of_speech_id' })
  PartOfSpeechId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @ManyToOne(() => Word, (words) => words.PartsOfSpeech)
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  Word: Word;

  @ManyToOne(() => PartOfSpeech, (partsOfSpeech) => partsOfSpeech.Words)
  @JoinColumn([{ name: 'part_of_speech_id', referencedColumnName: 'id' }])
  PartOfSpeech: PartOfSpeech;
}
