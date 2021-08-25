import client from '../client';
import { WordbookSpace } from '../typings/wordbookspace';
import { CreateSpacePayload } from '../typings/wordbookspace/CreateSpacePayload';

export interface CreateWordPayload {
  kanji: string;
  hiragana: string;
  katakana: string;
}

export default async function createSpace(
  payload: CreateWordPayload,
): Promise<WordbookSpace> {
  const response = await client.post('/wordbookspaces', payload);
  return response.data.payload;
}
