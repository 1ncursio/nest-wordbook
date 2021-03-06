import { mutate } from 'swr';
import client from '../client';
import { Word } from '../typings/word';
import { WordbookDetail } from '../typings/wordbook';
import produce from 'immer';

export interface CreateWordPayload {
  kanji: string;
  hiragana: string;
  katakana: string;
  korean: string;
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
      // {
      //   ...wordbookData,
      //   Words: [response.data.payload, ...wordbookData.Words],
      // },
      produce((wordbook: WordbookDetail) => {
        wordbook.Words.push(response.data.payload);
        return wordbook;
      }),
      false,
    );
  } else {
    mutate(wordbookData, true);
  }

  return response.data.payload;
}
