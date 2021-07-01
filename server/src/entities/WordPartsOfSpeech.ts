import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { PartsOfSpeech } from './PartsOfSpeech';
import { Words } from './Words';

@Entity('wordpartsofspeech', { schema: 'word_test_app' })
export class WordPartsOfSpeech {
  @Column('int', { primary: true, name: 'WordId' })
  WordId: number;

  @Column('int', { primary: true, name: 'PartOfSpeechId' })
  PartOfSpeechId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Words, (words) => words.PartsOfSpeech)
  @JoinColumn([{ name: 'WordId', referencedColumnName: 'id' }])
  Word: Words;

  @ManyToOne(() => PartsOfSpeech, (partsOfSpeech) => partsOfSpeech.Words)
  @JoinColumn([{ name: 'PartOfSpeechId', referencedColumnName: 'id' }])
  PartOfSpeech: PartsOfSpeech;
}
