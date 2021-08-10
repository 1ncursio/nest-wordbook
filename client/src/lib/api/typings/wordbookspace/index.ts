import { Role } from '../role';
import { User } from '../user';
import { Wordbook } from '../wordbook';

export interface WordbookSpace {
  id: string;
  OwnerId: string;
  name: string;
  visibility: string;
  image: string | null;
  shortBio: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Owner: Pick<User, 'id' | 'username' | 'image'>;
}

export interface WordbookSpaceDetail extends WordbookSpace {
  Members: {
    Member: Pick<User, 'id' | 'username' | 'image'>;
  };
  Roles: Role[];
  Wordbooks: Wordbook[];
}
