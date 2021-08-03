import React from 'react';
import SpaceCard from '../../components/SpaceCard';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import useSpaceSWR from '../../hooks/swr/useSpaceSWR';

const WordbookSpace = () => {
  const { data: userData } = useProfileSWR();
  const { data: spacesData } = useSpaceSWR();

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold w-80">단어장 공간</h2>
      <div className="flex flex-wrap">
        {React.Children.toArray(
          spacesData?.map((space) => <SpaceCard space={space} />),
        )}
      </div>
    </div>
  );
};

export default WordbookSpace;
