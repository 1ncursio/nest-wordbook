import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Wordbook } from '../../lib/api/typings/wordbook';

export type WordbookCardProps = {
  wordbooks: Wordbook[];
};

export type WordbookCardParams = {
  wordbookSpaceId: string;
};

const WordbookCard: FC<WordbookCardProps> = ({ wordbooks }) => {
  const { wordbookSpaceId } = useParams<WordbookCardParams>();

  return (
    <div className="flex flex-col gap-4">
      {React.Children.toArray(
        wordbooks.map((wordbook) => (
          <article className="p-4 rounded-lg bg-white shadow-10">
            <Link
              to={`/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbook.id}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800 text-xl">
                    {wordbook.name}
                  </h3>
                  {wordbook.shortBio && (
                    <p className="text-sm text-gray-500">{wordbook.shortBio}</p>
                  )}
                </div>
                <div>
                  <div>ㅎㅇ</div>
                  <div>ㅂㅇ</div>
                </div>
              </div>
            </Link>
          </article>
        )),
      )}
    </div>
  );
};

export default WordbookCard;
