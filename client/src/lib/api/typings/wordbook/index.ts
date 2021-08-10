export interface Wordbook {
  id: string;
  WordbookSpaceId: string;
  name: string;
  image: string | null;
  shortBio: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
