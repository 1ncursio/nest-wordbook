import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { WordbookDetail } from '../../lib/api/typings/wordbook';

export default function useWordbookSWR(
  wordbookSpaceId: string,
  wordbookId: string,
  options: SWRConfiguration = {},
): SWRResponse<WordbookDetail, unknown> & { isLoading: boolean } {
  const response = useSWR<WordbookDetail>(
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
