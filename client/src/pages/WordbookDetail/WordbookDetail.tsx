import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useWordbookSWR from '../../hooks/swr/useWordbookSWR';

export interface WordbookDetailParams {
  wordbookSpaceId: string;
  wordbookId: string;
}

const WordbookDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { wordbookSpaceId, wordbookId } = useParams<WordbookDetailParams>();
  const { data: wordbookData } = useWordbookSWR(wordbookSpaceId, wordbookId);

  const onSubmit = useCallback(async (data) => {
    if (!wordbookData) return;

    const word = await createWord(data);
  }, []);

  return (
    <div>
      <div>{wordbookData?.name}</div>
      <div>{wordbookData?.shortBio}</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('kanji')}
            id="kanji"
            placeholder="한자"
            autoComplete="off"
            spellCheck={false}
            className="input-primary"
          />
          <input
            type="text"
            {...register('hiragana')}
            id="hiragana"
            placeholder="히라가나"
            autoComplete="off"
            spellCheck={false}
            className="input-primary"
          />
          <input
            type="text"
            {...register('katakana')}
            id="katakana"
            placeholder="가타카나"
            autoComplete="off"
            spellCheck={false}
            className="input-primary"
          />
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  );
};

export default WordbookDetail;
