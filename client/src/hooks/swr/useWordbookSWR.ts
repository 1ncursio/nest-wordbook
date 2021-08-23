import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { WordbookSpaceDetail } from '../../lib/api/typings/wordbookspace';

export default function useWordbookSWR(
  wordbookSpaceId: string,
  wordbookId: string,
  options: SWRConfiguration = {},
): SWRResponse<WordbookSpaceDetail, unknown> & { isLoading: boolean } {
  const response = useSWR<WordbookSpaceDetail>(
    wordbookSpaceId && wordbookId
      ? `/wordbookspaces/${wordbookSpaceId}/wordbooks/${wordbookId}`
      : null,
    fetcher,
    {
      ...options,
    },
  );

  return {
    ...response,
    isLoading: !response.error && !response.data,
  };
}
