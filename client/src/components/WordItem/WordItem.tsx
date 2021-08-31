import React, {
  FC,
  FocusEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import { useParams } from 'react-router-dom';
import useWordbookSWRImmutable from '../../hooks/swr/useWordbookSWRImmutable';
import { Word } from '../../lib/api/typings/word';
import updateWord from '../../lib/api/word/updateWord';
import Icon from '../Icon';
import { WordbookDetailParams } from '../WordList/WordList';

export interface WordItemProps {
  word: Word;
}

export interface WordRequestPayload {
  kanji: string;
  hiragana: string;
  katakana: string;
  korean: string;
  level: string | null;
}

const WordItem: FC<WordItemProps> = ({ word }) => {
  const { wordbookSpaceId, wordbookId } = useParams<WordbookDetailParams>();
  const { data: wordbookData } = useWordbookSWRImmutable(
    wordbookSpaceId,
    wordbookId,
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<WordRequestPayload>();
  const [isEditMode, setIsEditMode] = useState(false);

  const openEditMode = useCallback(() => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
      reset({
        kanji: word.kanji,
        hiragana: word.hiragana,
        katakana: word.katakana,
        korean: word.korean,
        level: word.level,
      });
    }
  }, [isEditMode]);

  const onSubmit = useCallback(
    async (data) => {
      if (!wordbookData) return;

      if (
        word.kanji !== watch('kanji') ||
        word.hiragana !== watch('hiragana') ||
        word.katakana !== watch('katakana') ||
        word.korean !== watch('korean') ||
        word.level !== watch('level')
      ) {
        console.log('서브밋');
        await updateWord(
          wordbookSpaceId,
          wordbookId,
          data,
          wordbookData,
          word.id,
        );
      }

      setIsEditMode(false);
    },
    [wordbookData],
  );

  return (
    <article className="w-full p-4 rounded-lg bg-white shadow-10">
      <div className="flex justify-between">
        {isEditMode ? (
          <OutsideClickHandler onOutsideClick={handleSubmit(onSubmit)}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 justify-between items-center break-words"
            >
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
              <button type="submit" hidden>
                수정
              </button>
            </form>
          </OutsideClickHandler>
        ) : (
          <div className="flex flex-1 justify-between items-center break-words">
            <div className="font-bold text-gray-800 text-xl">{word.kanji}</div>
            <div className="font-bold text-gray-800 text-xl">
              {word.hiragana}
            </div>
            <div className="font-bold text-gray-800 text-xl">
              {word.katakana}
            </div>
            <div className="font-bold text-gray-800 text-xl">{word.korean}</div>
            <div className="font-bold text-gray-800 text-xl">{word.level}</div>
          </div>
        )}
        {/* TODO: Implement button component */}
        <div className="font-bold text-gray-800 text-xl">
          <button type="button" onClick={openEditMode}>
            <Icon name="filledEdit" className="text-white" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default WordItem;
