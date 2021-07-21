import client, { refreshInterceptor } from '../client';
import refreshClient from '../refreshClient';

const refreshAccessToken = async () => {
  const response = await refreshClient.get('/auth/refresh');
  return response.headers.authorization;
};

export default refreshAccessToken;
