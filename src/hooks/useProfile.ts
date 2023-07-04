import useSWR, { SWRConfig } from 'swr';

import { PUBLIC_ENDPOINT } from '../public';
import { Profile, RecordKey } from '../types';

const AddressRegex = /^0x[\dA-Fa-f]{40}$/;

// More accepting then it should be but good safeguard
const NameRegex = /^(?:[L-NPSZps{}]+\.){2,}[L-NPSZps{}]{2,}$/;

type NameOrAddress =
    | {
          name: string;
      }
    | {
          address: string;
      }
    | {
          nameOrAddress: string;
      };

export type ProfileProperties = NameOrAddress & {
    endpoint?: string;
    enabled?: boolean;
    keys: RecordKey[];
    swr?: typeof SWRConfig;
};

const getNameAndAddress = (
    properties: NameOrAddress
): { type: 'name' | 'address' | 'unknown'; value: string } => {
    if ('name' in properties) {
        return { type: 'name', value: properties.name };
    }

    if ('address' in properties) {
        return { type: 'address', value: properties.address };
    }

    if ('nameOrAddress' in properties) {
        if (properties.nameOrAddress.match(NameRegex) !== null) {
            return { type: 'name', value: properties.nameOrAddress };
        }

        if (properties.nameOrAddress.match(AddressRegex) !== null) {
            return { type: 'address', value: properties.nameOrAddress };
        }
    }

    return { type: 'unknown', value: '' };
};

const getProfileKey = (
    type: 'name' | 'address' | 'unknown',
    value: string,
    endpoint: string
) => {
    if (type === 'name') {
        return endpoint + '/n/' + value;
    }

    if (type === 'address') {
        return endpoint + '/a/' + value;
    }
};

export const useProfile = (properties: ProfileProperties) => {
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
                mode: 'no-cors',
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
