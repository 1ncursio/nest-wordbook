import { mutate } from 'swr';
import client from '../client';
import { Word } from '../typings/word';
import { WordbookDetail } from '../typings/wordbook';

export interface CreateWordPayload {
  kanji: string;
  hiragana: string;
  katakana: string;
}

export default async function createWord(
  wordbookSpaceId: string,
  wordbookId: string,
  payload: CreateWordPayload,
  wordbookData: WordbookDetail,
): Promise<Word> {
  const response = await client.post(
    `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}/words`,
    payload,
  );

  if (wordbookData) {
    mutate(
      `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}`,
      {
        ...wordbookData,
        Words: [response.data.payload, ...wordbookData.Words],
      },
      false,
    );
  } else {
    mutate(wordbookData, true);
  }

  return response.data.payload;
}
