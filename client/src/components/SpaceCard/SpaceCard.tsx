import React from 'react';
import { WordbookSpace } from '../../lib/api/typings/wordbookspace';
import optimizeImage from '../../lib/optimizeImage';

export type SpaceCardProps = {
  space: WordbookSpace;
};

const SpaceCard = ({ space }: SpaceCardProps) => {
  return (
    <div className="flex flex-col w-1/4 rounded-md shadow">
      {space.image && <img src={optimizeImage(space.image)} alt="" />}
      <h3 className="font-bold text-gray-800 text-2xl">{space.name}</h3>
    </div>
  );
};

export default SpaceCard;
