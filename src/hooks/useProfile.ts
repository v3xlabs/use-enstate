import useSWR, { SWRConfig } from 'swr';

import { profileFetcher } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import { BaseSwrHookProperties } from '../types/HookProperties';
import { ProfileProperties } from '../types/ProfileProperties';

export type ProfileHookProperties = ProfileProperties & {
    enabled?: boolean;
    swr?: typeof SWRConfig;
};

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
