import useSWR, { SWRConfiguration } from 'swr';
import fetcher from '../../lib/api/fetcher';
import { WordbookSpace } from '../../lib/api/typings/wordbookspace';

export default function useProfileSWR(options: SWRConfiguration = {}) {
  return useSWR<WordbookSpace[]>('/wordbookspaces', fetcher, { ...options });
}
