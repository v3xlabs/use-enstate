import { getNameAndAddress, getProfileKey } from '../helpers';
import { PUBLIC_ENDPOINT } from '../public';
import { Profile } from '../types/Profile';
import { ProfileProperties } from '../types/ProfileProperties';

export const getProfile = async (
    properties: ProfileProperties
): Promise<Profile> => {
    const { type, value } = getNameAndAddress(properties);

    const key = getProfileKey(
        type,
        value,
        properties.endpoint || PUBLIC_ENDPOINT
    );

    if (!key) {
        throw new Error('Could not get profile key');
    }

    const response = await fetch(key, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Could not fetch profile');
    }

    return (await response.json()) as Profile;
};
