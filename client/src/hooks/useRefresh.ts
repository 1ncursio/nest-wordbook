import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import refreshAccessToken from '../lib/api/auth/refreshAccessToken';

const useRefresh = () => {
  const history = useHistory();

  const refresh = useCallback(async () => {
    try {
      await refreshAccessToken();
      history.replace('/wordbookspace');
    } catch (e) {
      console.error(e);
    }
  }, []);

  return refresh;
};

export default useRefresh;
