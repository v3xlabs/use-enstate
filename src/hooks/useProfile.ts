import useSWR from 'swr';

import { getNameAndAddress, getProfileKey } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import { Profile } from '../types';
import { ProfileHookProperties } from '../types/ProfileProperties';

export const useProfile = (properties: ProfileHookProperties) => {
    const { type, value } = getNameAndAddress(properties);

    const enabled = properties.enabled ?? type !== 'unknown';

    const key = getProfileKey(
        type,
        value,
        properties.endpoint || PUBLIC_ENDPOINT
    );

    return useSWR(
        enabled && key,
        async (argument: string) => {
            const response = await fetch(argument, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Could not fetch profile');
            }

            return (await response.json()) as Profile;
        },
        properties.swr
    );
};
