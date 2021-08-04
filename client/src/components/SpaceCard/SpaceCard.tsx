import React from 'react';
import { WordbookSpace } from '../../lib/api/typings/wordbookspace';
import optimizeImage from '../../lib/optimizeImage';
import { userThumbnail } from '../../assets/images';

export type SpaceCardProps = {
  space: WordbookSpace;
};

const SpaceCard = ({ space }: SpaceCardProps) => {
  return (
    <article className="flex flex-col w-1/4 rounded-lg shadow border">
      <header className="px-4 py-2">
        <h3 className="font-bold text-gray-800 text-xl">{space.name}</h3>
      </header>
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={optimizeImage(space.image ?? userThumbnail)}
          alt=""
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="p-4">
        <p>{space.shortBio}</p>
      </div>
      <footer className="p-4">
        <span className="flex">
          <img
            src={optimizeImage(space.Owner?.image ?? userThumbnail)}
            alt="profile"
            className="rounded-full w-8 h-8 object-cover mr-2"
          />
          <b>{space.Owner.username}</b>
        </span>
      </footer>
    </article>
  );
};

export default SpaceCard;
