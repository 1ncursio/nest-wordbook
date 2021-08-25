import { Wordbook } from '../wordbook';

export interface Word {
  id: string;
  kanji: string;
  hiragana: string;
  katakana: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  WordbookId: string;
  Wordbook?: Wordbook;
  // TODO: interfaces declaration
  Senses: WordSense[];
  PartsOfSpeech: WordPartOfSpeech[];
  Exams?: Exam[];
}
