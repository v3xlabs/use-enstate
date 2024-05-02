import type { SWRResponse } from 'swr';
import useSWR from 'swr';

import { bulkProfileFetcher } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import { BaseSwrHookProperties } from '../types/HookProperties';

export const useBulkProfile = (
    queries: string[],
    properties?: BaseSwrHookProperties
): SWRResponse<Awaited<ReturnType<typeof bulkProfileFetcher>>, any, any> => {
    return useSWR(
        properties?.enabled !== false && [
            properties?.endpoint ?? PUBLIC_ENDPOINT,
            '/bulk/u',
            queries,
        ],
        ([endpoint, _, queries]) => bulkProfileFetcher(endpoint, queries),
        properties?.swr
    );
};
