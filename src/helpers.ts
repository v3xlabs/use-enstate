import { NameOrAddress } from './types/NameOrAddress';

const AddressRegex = /^0x[\dA-Fa-f]{40}$/;

// More accepting then it should be but good safeguard
const NameRegex = /^(?:[L-NPSZps{}]+\.){2,}[L-NPSZps{}]{2,}$/;

export const getProfileKey = (
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

export const getNameAndAddress = (
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