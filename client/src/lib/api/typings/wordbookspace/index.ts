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
}