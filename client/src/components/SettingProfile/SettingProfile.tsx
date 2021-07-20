import React, { useCallback } from 'react';
import { userThumbnail } from '../../assets/images';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import optimizeImage from '../../lib/optimizeImage';
import Button from '../Button';

const SettingProfile = () => {
  const { data: userData } = useProfileSWR();

  const onUpload = useCallback(() => {
    // upload handler
  }, []);

  const onClearThumbnail = useCallback(() => {
    // upload handler
  }, []);

  return (
    <section className="flex">
      <div className="inline-flex flex-col pr-6 border-r-2 border-gray-100">
        <img
          src={optimizeImage(userData?.image ?? userThumbnail)}
          alt="profile"
          className="rounded-full w-32 h-32 mb-4"
        />
        <Button
          onClick={onUpload}
          text="이미지 변경"
          className="btn-cyan mb-2"
        />
        <Button
          onClick={onClearThumbnail}
          text="이미지 삭제"
          className="btn-white"
        />
      </div>
      <div className="pl-6">
        <h2 className="font-bold text-4xl">{userData?.username}</h2>
      </div>
    </section>
  );
};

export default SettingProfile;
