import axios from 'axios';
import jwtDecode from 'jwt-decode';

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3095'
    : 'https://api.nestwordbook.com';

client.interceptors.request.use((config) => {
  const accessToken = config.headers['Authorization'];

  if (!accessToken) return config;

  const decoded = jwtDecode(accessToken);

  console.log({ decoded });
  return config;
});

export default client;
