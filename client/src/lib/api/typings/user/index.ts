export type User = {
  id: string;
  email: string | null;
  username: string;
  role: string;
  image: string | null;
  shortBio: string | null;
  enabled: boolean;
  provider: 'local' | 'google' | 'kakao' | 'github';
  socialId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
