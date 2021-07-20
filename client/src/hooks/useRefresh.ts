import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import refreshAccessToken from '../lib/api/auth/refreshAccessToken';
import client from '../lib/api/client';

const useRefresh = () => {
  const history = useHistory();

  const refresh = useCallback(async () => {
    try {
      const authorization = await refreshAccessToken();
      client.defaults.headers.common.authorization = authorization;
      history.replace('/wordbookspace');
    } catch (e) {
      console.error(e);
    }
  }, []);

  return refresh;
};

export default useRefresh;
