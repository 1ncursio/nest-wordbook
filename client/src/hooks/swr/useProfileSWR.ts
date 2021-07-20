import useSWR, { SWRConfiguration } from 'swr';
import { User } from '../../lib/api/auth/types';
import fetcher from '../../lib/api/fetcher';

export default function useProfileSWR(options: SWRConfiguration = {}) {
  return useSWR<User>('/auth/profile', fetcher, { ...options });
}
