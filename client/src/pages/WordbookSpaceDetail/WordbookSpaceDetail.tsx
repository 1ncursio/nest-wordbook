import React, { VFC } from 'react';
import { useParams } from 'react-router-dom';
import useSpaceSWR from '../../hooks/swr/useSpaceSWR';

const WordbookSpaceDetail: VFC = () => {
  const { wordbookSpaceId } = useParams<{ wordbookSpaceId: string }>();
  const { data: spaceData } = useSpaceSWR(wordbookSpaceId);

  return (
    <div>
      <h3 className="text-2xl font-bold">{spaceData?.name}</h3>
    </div>
  );
};

export default WordbookSpaceDetail;
