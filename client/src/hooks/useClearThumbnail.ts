import { useCallback } from 'react';
import deleteUserImage from '../lib/api/user/deleteUserImage';
import useProfileSWR from './swr/useProfileSWR';

const useClearThumbnail = () => {
  const { data: userData, mutate: mutateUser } = useProfileSWR();

  const handler = useCallback(async () => {
    await deleteUserImage();
    mutateUser({ ...userData!, image: null }, false);
  }, []);

  return handler;
};

export default useClearThumbnail;
