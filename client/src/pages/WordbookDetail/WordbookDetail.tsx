import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useWordbookSWR from '../../hooks/swr/useWordbookSWR';
import { Word } from '../../lib/api/typings/word';
import createWord from '../../lib/api/word/createWord';

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

  const onSubmit = useCallback(
    async (data) => {
      if (!wordbookData) return;

      const word = await createWord(
        wordbookSpaceId,
        wordbookId,
        data,
        wordbookData,
      );
    },
    [wordbookData],
  );

  const onExportCSV = useCallback(
    (words?: Word[]) => () => {
      console.log(words);
      // TODO: Implement json to csv converter and download it
    },
    [],
  );

  return (
    <div className="w-2xl lg:w-full xl:w-lg 2xl:w-xl mx-auto 2xl:px-4">
      <div>{wordbookData?.name}</div>
      {wordbookData?.shortBio && <div>{wordbookData.shortBio}</div>}
      <div className="flex gap-4">
        <button type="button" className="btn-cyan">
          데이터 가져오기
        </button>
        <button
          type="button"
          onClick={onExportCSV(wordbookData?.Words)}
          className="btn-white"
        >
          데이터 내보내기
        </button>
      </div>
      <div>
        <div>
          {React.Children.toArray(
            wordbookData?.Words.map((word) => (
              <article className="w-full p-4 rounded-lg bg-white shadow-10">
                <div className="flex justify-between items-center break-words">
                  <div className="font-bold text-gray-800 text-xl">
                    {word.kanji}
                  </div>
                  <div className="font-bold text-gray-800 text-xl">
                    {word.hiragana}
                  </div>
                  <div className="font-bold text-gray-800 text-xl">
                    {word.katakana}
                  </div>
                  <div className="font-bold text-gray-800 text-xl">
                    {word.level}
                  </div>
                </div>
              </article>
            )),
          )}
        </div>
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
