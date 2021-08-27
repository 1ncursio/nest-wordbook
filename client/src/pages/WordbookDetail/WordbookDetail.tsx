import { parseAsync } from 'json2csv';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import IconButton from '../../components/IconTextButton/IconTextButton';
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
    (words?: Word[]) => async () => {
      if (!wordbookData || !words) return;

      const csv = await parseAsync(words, {
        fields: ['kanji', 'hiragana', 'katakana'],
      });

      const a = document.createElement('a');
      const file = new Blob([csv], { type: 'text/csv' });
      a.href = URL.createObjectURL(file);
      a.download = `${wordbookData.name.replace(/\s/, '_')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    [wordbookData],
  );

  return (
    <div className="w-2xl lg:w-full xl:w-lg 2xl:w-xl mx-auto 2xl:px-4">
      <div>{wordbookData?.name}</div>
      {wordbookData?.shortBio && <div>{wordbookData.shortBio}</div>}
      <div className="flex gap-4">
        <button type="button" className="btn-cyan">
          <Icon name="upload" />
          데이터 가져오기
        </button>
        <button
          type="button"
          onClick={onExportCSV(wordbookData?.Words)}
          className="btn-white"
        >
          <Icon name="download" />
          데이터 내보내기
        </button>
      </div>
      <div>
        <div>
          {React.Children.toArray(
            wordbookData?.Words.map((word) => (
              <div className="flex gap-4">
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
                {/* <button type="button">삭제</button> */}
                <IconButton
                  icon="remove"
                  onClick={() => {}}
                  className="w-12 h-12 border-0"
                />
              </div>
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
