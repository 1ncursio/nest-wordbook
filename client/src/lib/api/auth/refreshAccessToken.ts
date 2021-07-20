import refreshClient from '../refreshClient';

const refreshAccessToken = async () => {
  const response = await refreshClient.get('/auth/refresh');
  console.log('refresh!');
  // client.defaults.headers.common.authorization = response.headers.authorization;
  return response.headers.authorization;
};

export default refreshAccessToken;
