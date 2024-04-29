import type { SWRResponse } from 'swr';
import useSWR from 'swr';

import { profileFetcher } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import type { BaseSwrHookProperties } from '../types/HookProperties';

export const useProfile = (
    query: string,
    properties?: BaseSwrHookProperties
): SWRResponse<Awaited<ReturnType<typeof profileFetcher>>, any, any> => {
    return useSWR(
        properties?.enabled !== false && [
            properties?.endpoint ?? PUBLIC_ENDPOINT,
            '/u',
            query,
        ],
        ([endpoint, _, query]) => profileFetcher(endpoint, query),
        properties?.swr
    );
};
