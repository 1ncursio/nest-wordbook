import React, { VFC } from 'react';
import SpaceCard from '../../components/SpaceCard';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import useSpaceSWR from '../../hooks/swr/useSpaceSWR';

const WordbookSpace: VFC = () => {
  const { data: userData } = useProfileSWR();
  const { data: spacesData } = useSpaceSWR();

  return (
    <div className="w-2xl xl:w-full max-w">
      <h2 className="text-gray-800 font-bold text-3xl mb-6">단어장 공간</h2>
      <div className="grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {React.Children.toArray(
          spacesData?.map((space) => <SpaceCard space={space} />),
        )}
      </div>
    </div>
  );
};

export default WordbookSpace;
