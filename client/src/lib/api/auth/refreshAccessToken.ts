import client from '../client';

const refreshAccessToken = async () => {
  const response = await client.get('/auth/refresh');
  console.log({ authorization: response.headers.Authorization });
  client.defaults.headers.Authorization = response.headers.Authorization;
};

export default refreshAccessToken;
