import { BulkResponse, ListResponse, ProfileResponse } from './types';

export const profileFetcher = async (baseUrl: string, query: string) => {
    const url = baseUrl + '/u/' + query;

    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Could not fetch profile');
    }

    return (await response.json()) as ProfileResponse;
};

export const bulkProfileFetcher = async (
    baseUrl: string,
    queries: string[]
) => {
    const url = `${baseUrl}/bulk/u?queries[]=${queries.join('&queries[]=')}`;

    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Could not fetch profile');
    }

    return (await response.json()) as ListResponse<
        BulkResponse<ProfileResponse>
    >;
};
