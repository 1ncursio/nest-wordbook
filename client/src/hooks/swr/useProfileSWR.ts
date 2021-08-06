import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { User } from '../../lib/api/typings/user';

export default function useProfileSWR(
  options: SWRConfiguration = {},
): SWRResponse<User, unknown> {
  return useSWR<User>('/auth/profile', fetcher, { ...options });
}
