import client from '../client';
import { WordbookSpace } from '../typings/wordbookspace';
import { CreateSpacePayload } from '../typings/wordbookspace/CreateSpacePayload';

export default async function createSpace(
  payload: CreateSpacePayload,
): Promise<WordbookSpace> {
  const response = await client.post('/wordbookspaces', payload);
  return response.data.payload;
}
