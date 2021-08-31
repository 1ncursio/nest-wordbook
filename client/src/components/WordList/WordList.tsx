import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router-dom';
import useWordbookSWRImmutable from '../../hooks/swr/useWordbookSWRImmutable';
import deleteWord from '../../lib/api/word/deleteWord';
import IconButton from '../IconTextButton/IconTextButton';
import WordItem from '../WordItem';

export interface WordbookDetailParams {
  wordbookSpaceId: string;
  wordbookId: string;
}

const WordList: VFC = () => {
  const { wordbookSpaceId, wordbookId } = useParams<WordbookDetailParams>();
  const { data: wordbookData } = useWordbookSWRImmutable(
    wordbookSpaceId,
    wordbookId,
  );

  const onDeleteWord = useCallback(
    (wordId: string) => async () => {
      if (!wordbookData) return;

      await deleteWord(wordbookSpaceId, wordbookId, wordbookData, wordId);
    },
    [wordbookData],
  );

  return (
    <div>
      {React.Children.toArray(
        wordbookData?.Words.map((word) => (
          <div className="flex gap-4">
            <WordItem word={word} />
            {/* <button type="button">삭제</button> */}
            <IconButton
              icon="remove"
              onClick={onDeleteWord(word.id)}
              className="w-12 h-12 border-0"
            />
          </div>
        )),
      )}
    </div>
  );
};

export default WordList;
