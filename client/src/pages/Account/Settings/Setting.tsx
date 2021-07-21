import React, { useEffect } from 'react';
import AccountSetting from '../../../components/AccountSetting';
import useProfileSWR from '../../../hooks/swr/useProfileSWR';

const Setting = () => {
  const { data: userData } = useProfileSWR();
  useEffect(() => {
    if (userData) console.log({ data: userData });
  }, [userData]);

  return (
    <>
      <h2 className="text-gray-800 font-bold text-3xl mb-6">내 프로필 설정</h2>
      <AccountSetting />
    </>
  );
};

export default Setting;
