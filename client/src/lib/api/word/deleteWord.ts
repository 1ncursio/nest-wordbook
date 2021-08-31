import produce from 'immer';
import { mutate } from 'swr';
import client from '../client';
import { Word } from '../typings/word';
import { WordbookDetail } from '../typings/wordbook';
import { CreateWordPayload } from './createWord';

export default async function deleteWord(
  wordbookSpaceId: string,
  wordbookId: string,
  wordbookData: WordbookDetail,
  wordId: string,
): Promise<Word> {
  const response = await client.delete(
    `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}/words/${wordId}`,
  );

  if (wordbookData) {
    mutate(
      `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}`,
      produce((wordbook: WordbookDetail) => {
        wordbook.Words = wordbook.Words.filter(
          (word) => word.id !== response.data.payload.id,
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
