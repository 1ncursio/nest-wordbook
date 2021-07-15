import axios from 'axios';

const fetcher = axios.create({
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'https://api.nestwordbook.com',
});

export default fetcher;
