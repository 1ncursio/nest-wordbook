import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { WordbookSpace } from '../../lib/api/typings/wordbookspace';

export default function useSpacesSWR(
  options: SWRConfiguration = {},
): SWRResponse<WordbookSpace[], unknown> & { isLoading: boolean } {
  const response = useSWR<WordbookSpace[]>('/wordbookspaces', fetcher, {
    ...options,
  });

  return {
    ...response,
    isLoading: !response.error && !response.data,
  };
}
