import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { spaceThumbnail, userThumbnail } from '../../assets/images';
import { WordbookSpace } from '../../lib/api/typings/wordbookspace';
import optimizeImage from '../../lib/optimizeImage';
import CreateSpaceCardButton from '../CreateSpaceCardButton';

export type SpaceCardProps = {
  spaces: WordbookSpace[];
};

const SpaceCard: FC<SpaceCardProps> = ({ spaces }) => {
  const ellipsisShortBio = useMemo(
    () => (shortBio: string) =>
      shortBio.length >= 80 ? `${shortBio.slice(0, 80)}...` : shortBio,
    [],
  );

  return (
    <>
      <CreateSpaceCardButton />
      {React.Children.toArray(
        spaces.map((space) => (
          <article className="flex flex-col rounded-xl shadow transform transition hover:scale-105 hover:shadow-lg bg-white">
            <Link to={`/wordbookspaces/${space.id}`}>
              <header className="px-4 py-2">
                <h3 className="font-bold text-gray-800 text-xl">
                  {space.name}
                </h3>
              </header>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={optimizeImage(space.image ?? spaceThumbnail)}
                  alt="space-thumbnail"
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="p-4 h-16 overflow-ellipsis overflow-hidden">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {ellipsisShortBio(space.shortBio ?? '')}
                </p>
              </div>
            </Link>
            <footer className="flex items-center p-4">
              <img
                src={optimizeImage(space.Owner.image ?? userThumbnail)}
                alt="profile"
                className="rounded-full w-6 h-6 object-cover mr-2"
              />
              <b className="text-sm">{space.Owner.username}</b>
            </footer>
          </article>
        )),
      )}
    </>
  );
};

export default SpaceCard;
