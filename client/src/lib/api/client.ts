import axios from 'axios';
import jwtDecode from 'jwt-decode';
import refreshAccessToken from './auth/refreshAccessToken';

export type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

const client = axios.create({ withCredentials: true });

client.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3095'
    : 'https://api.nestwordbook.com';

export const refreshInterceptor = client.interceptors.request.use(
  async (config) => {
    const accessToken = config.headers.common.authorization;

    if (!accessToken) {
      const authorization = await refreshAccessToken();
      config.headers.authorization = authorization;
      client.defaults.headers.common.authorization = authorization;
      return config;
    }

    const decoded = jwtDecode<TokenPayload>(accessToken);

    /* 액세스 토큰 만료 시간까지 1분 미만일 경우 리프레시 */
    if (decoded.exp * 1000 <= Date.now() + 60 * 1000) {
      const authorization = await refreshAccessToken();
      config.headers.authorization = authorization;
      client.defaults.headers.common.authorization = authorization;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default client;
