import React, { FC } from 'react';
import { userThumbnail } from '../../assets/images';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import optimizeImage from '../../lib/optimizeImage';

type HeaderUserIconProps = {
  onClick: (e: React.MouseEvent) => void;
};

const HeaderUserIcon: FC<HeaderUserIconProps> = ({ onClick }) => {
  const { data: userData } = useProfileSWR();

  return (
    <button onClick={onClick} className="cursor-pointer">
      <img
        src={optimizeImage(userData?.image ?? userThumbnail)}
        alt="profile"
        className="rounded-full w-10 h-10 object-cover"
      />
    </button>
  );
};

export default HeaderUserIcon;
