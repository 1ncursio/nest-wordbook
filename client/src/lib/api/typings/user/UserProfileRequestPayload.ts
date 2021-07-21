import { User } from '.';

export type UserProfileRequestPayload = Pick<User, 'username' | 'shortBio'>;
