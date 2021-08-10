import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { User } from '../../lib/api/typings/user';

// export interface SWRResponseWith

export default function useProfileSWR(
  options: SWRConfiguration = {},
): SWRResponse<User, unknown> & { isLoading: boolean } {
  const response = useSWR<User>('/auth/profile', fetcher, { ...options });

  return {
    ...response,
    isLoading: !response.error && !response.data,
  };
}
