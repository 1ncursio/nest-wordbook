import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { WordbookSpace } from '../../lib/api/typings/wordbookspace';

export default function useSpaceSWR(
  wordbookSpaceId: string,
  options: SWRConfiguration = {},
): SWRResponse<WordbookSpace, unknown> {
  return useSWR<WordbookSpace>(
    wordbookSpaceId ? `/wordbookspaces/${wordbookSpaceId}` : null,
    fetcher,
    {
      ...options,
    },
  );
}
