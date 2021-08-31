import produce from 'immer';
import { mutate } from 'swr';
import client from '../client';
import { Word } from '../typings/word';
import { WordbookDetail } from '../typings/wordbook';
import { CreateWordPayload } from './createWord';

export default async function updateWord(
  wordbookSpaceId: string,
  wordbookId: string,
  payload: CreateWordPayload,
  wordbookData: WordbookDetail,
  wordId: string,
): Promise<Word> {
  const response = await client.patch(
    `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}/words/${wordId}`,
    payload,
  );

  if (wordbookData) {
    mutate(
      `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}`,
      produce((wordbook: WordbookDetail) => {
        wordbook.Words = wordbook.Words.map((word) =>
          word.id === wordId ? response.data.payload : word,
        );
        return wordbook;
      }),
      false,
    );
  } else {
    mutate(wordbookData, true);
  }

  return response.data.payload;
}
