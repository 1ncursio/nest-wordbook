import React, { useEffect } from 'react';
import AccountProfile from '../../../components/AccountProfile';
import useProfileSWR from '../../../hooks/swr/useProfileSWR';

const Profile = () => {
  const { data: userData } = useProfileSWR();
  useEffect(() => {
    if (userData) console.log({ data: userData });
  }, [userData]);

  return (
    <>
      <AccountProfile />
    </>
  );
};

export default Profile;
