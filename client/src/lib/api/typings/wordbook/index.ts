import { User } from '../user';
import { Word } from '../word';

export interface Wordbook {
  id: string;
  WordbookSpaceId: string;
  name: string;
  image: string | null;
  shortBio: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Author: Pick<User, 'id' | 'username' | 'image'>;
}

export interface WordbookDetail extends Wordbook {
  Words: Word[];
}
