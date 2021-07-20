import axios from 'axios';

const refreshClient = axios.create({
  withCredentials: true,
});

refreshClient.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3095'
    : 'https://api.nestwordbook.com';

export default refreshClient;
