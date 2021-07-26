import React from 'react';
import { userThumbnail } from '../../assets/images';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import optimizeImage from '../../lib/optimizeImage';

type HeaderUserIconProps = {
  onClick: (e: React.MouseEvent) => void;
};

const HeaderUserIcon = ({ onClick }: HeaderUserIconProps) => {
  const { data: userData } = useProfileSWR();

  return (
    <div onClick={onClick} className="cursor-pointer">
      <img
        src={optimizeImage(userData?.image ?? userThumbnail)}
        alt="profile"
        className="rounded-full w-10 h-10 object-cover"
      />
    </div>
  );
};

export default HeaderUserIcon;
