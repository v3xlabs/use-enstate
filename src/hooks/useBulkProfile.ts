import useSWR from 'swr';

import { bulkProfileFetcher } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import { BaseSwrHookProperties } from '../types/HookProperties';

export const useBulkProfile = (
    queries: string[],
    properties: BaseSwrHookProperties
) => {
    return useSWR(
        properties.enabled && [
            properties.endpoint ?? PUBLIC_ENDPOINT,
            '/bulk/u',
            queries,
        ],
        ([endpoint, path, queries]) => bulkProfileFetcher(endpoint, queries),
        properties.swr
    );
};
