import { parseAsync } from 'json2csv';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import { WordRequestPayload } from '../../components/WordItem/WordItem';
import WordList from '../../components/WordList';
import useWordbookSWRImmutable from '../../hooks/swr/useWordbookSWRImmutable';
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
    reset,
    formState: { errors },
  } = useForm<WordRequestPayload>();
  const { wordbookSpaceId, wordbookId } = useParams<WordbookDetailParams>();
  const { data: wordbookData } = useWordbookSWRImmutable(
    wordbookSpaceId,
    wordbookId,
  );

  const onSubmit = useCallback(
    async (data) => {
      if (!wordbookData) return;

      await createWord(wordbookSpaceId, wordbookId, data, wordbookData);
      reset({
        kanji: '',
        hiragana: '',
        katakana: '',
        korean: '',
        level: 'N3',
      });
    },
    [wordbookData],
  );

  const onExportCSV = useCallback(
    (words?: Word[]) => async () => {
      if (!wordbookData || !words) return;

      const csv = await parseAsync(words, {
        fields: ['kanji', 'hiragana', 'katakana', 'korean', 'level'],
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
        {/* TODO: skeleton */}
        {wordbookData && <WordList />}
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
          <input
            type="text"
            {...register('korean')}
            id="korean"
            placeholder="뜻"
            autoComplete="off"
            spellCheck={false}
            className="input-primary"
          />
          <select {...register('level')} id="level" defaultValue="N3">
            <option value="N1">N1</option>
            <option value="N2">N2</option>
            <option value="N3">N3</option>
            <option value="N4">N4</option>
            <option value="N5">N5</option>
          </select>
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  );
};

export default WordbookDetail;
