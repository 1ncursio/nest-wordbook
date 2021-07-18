import useSWR from 'swr';
import client from '../client';
import fetcher from '../fetcher';

const getProfile = async () => {
  const { data } = useSWR('/api/auth/profile', fetcher);
};

export default getProfile;
