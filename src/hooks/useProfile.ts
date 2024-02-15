import useSWR from 'swr';

import { profileFetcher } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import { BaseSwrHookProperties } from '../types/HookProperties';

export const useProfile = (
    query: string,
    properties: BaseSwrHookProperties
) => {
    return useSWR(
        properties.enabled && [
            properties.endpoint ?? PUBLIC_ENDPOINT,
            '/u',
            query,
        ],
        ([endpoint, path, query]) => profileFetcher(endpoint, query),
        properties.swr
    );
};
