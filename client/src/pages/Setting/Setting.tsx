import React, { useEffect } from 'react';
import SettingAccount from '../../components/SettingAccount';
import SettingProfile from '../../components/SettingProfile';
import useProfileSWR from '../../hooks/swr/useProfileSWR';

const Setting = () => {
  const { data: userData } = useProfileSWR();
  useEffect(() => {
    if (userData) console.log({ data: userData });
  }, [userData]);

  return (
    <>
      <SettingProfile />
      <SettingAccount />
    </>
  );
};

export default Setting;
