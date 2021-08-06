import { css, Global } from '@emotion/react';
import React, { VFC } from 'react';
import { Helmet } from 'react-helmet-async';
import CreateSpaceCardButton from '../../components/CreateSpaceCardButton';
import SpaceCard from '../../components/SpaceCard';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import useSpaceSWR from '../../hooks/swr/useSpaceSWR';

const WordbookSpace: VFC = () => {
  const { data: userData } = useProfileSWR();
  const { data: spacesData } = useSpaceSWR();

  return (
    <div className="w-2xl lg:w-full xl:w-lg 2xl:w-xl mx-auto 2xl:px-4">
      <Helmet>
        <title>내 단어장 공간 - Nest Wordbook</title>
      </Helmet>
      <h2 className="text-gray-800 font-bold text-3xl mb-6">단어장 공간</h2>
      <div className="grid grid-cols-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {spacesData && <SpaceCard spaces={spacesData} />}
      </div>
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

export default WordbookSpace;
