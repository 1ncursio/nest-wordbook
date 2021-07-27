import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { mutate } from 'swr';
import logout from '../lib/api/auth/logout';
import client from '../lib/api/client';

const useLogout = () => {
  const history = useHistory();

  const handler = useCallback(async () => {
    await logout();
    mutate('/auth/profile', null, false);
    delete client.defaults.headers.common.authorization;
    history.replace('/');
  }, []);

  return handler;
};

export default useLogout;
