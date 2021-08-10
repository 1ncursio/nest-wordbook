import { css, Global } from '@emotion/react';
import React, { VFC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import WordbookCard from '../../components/WordbookCard';
import useSpaceSWR from '../../hooks/swr/useSpaceSWR';

const WordbookSpaceDetail: VFC = () => {
  const { wordbookSpaceId } = useParams<{ wordbookSpaceId: string }>();
  const { data: spaceData } = useSpaceSWR(wordbookSpaceId);

  if (!spaceData) {
    return null;
  }

  return (
    <div className="w-2xl lg:w-full xl:w-lg 2xl:w-xl mx-auto 2xl:px-4">
      <Helmet>
        <title>{spaceData.name} 단어장 공간 - Nest Wordbook</title>
      </Helmet>
      <h3 className="text-2xl font-bold">{spaceData.name}</h3>
      <p className="text-gray-600">{spaceData.shortBio}</p>
      <p className="text-gray-600">{`${spaceData.Wordbooks.length}개의 단어장`}</p>
      {/* <WordbookSpaceDetailForm /> */}
      <WordbookCard wordbooks={spaceData.Wordbooks} />
      <Global styles={globalStyle} />
    </div>
  );
};

const globalStyle = css`
  html,
  body,
  #main {
    background-color: #fafafa;
  }
`;

export default WordbookSpaceDetail;
