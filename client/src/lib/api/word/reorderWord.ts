import produce from 'immer';
import { mutate } from 'swr';
import client from '../client';
import { Word } from '../typings/word';

export interface ReorderWordPayload {
  rank: number;
}

export default async function reorderWord(
  wordbookSpaceId: string,
  wordbookId: string,
  payload: ReorderWordPayload,
  //   wordbookData: WordbookDetail,
  wordId: string,
): Promise<Word> {
  const response = await client.patch(
    `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}/words/${wordId}/reorder`,
    payload,
  );

  //   if (wordbookData) {
  //     mutate(
  //       `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}`,
  //       produce((wordbook: WordbookDetail) => {
  //         wordbook.Words = wordbook.Words.map((word) =>
  //           word.id === wordId ? response.data.payload : word,
  //         );
  //         return wordbook;
  //       }),
  //       false,
  //     );
  //   } else {
  //     mutate(wordbookData, true);
  //   }

  return response.data.payload;
}
