import client, { refreshInterceptor } from '../client';

const refreshAccessToken = async () => {
  client.interceptors.request.eject(refreshInterceptor);
  const response = await client.get('/auth/refresh');
  return response.headers.authorization;
};

export default refreshAccessToken;
