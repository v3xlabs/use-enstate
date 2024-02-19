import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription';

import { PUBLIC_ENDPOINT } from '../public';
import { BulkResponse, ProfileResponse, SSEResponse } from '../types';
import { BaseSwrHookProperties } from '../types/HookProperties';

export const useStreamingBulkProfile = (
    queries: string[],
    properties: BaseSwrHookProperties
) =>
    useSWRSubscription(
        properties.enabled && [
            properties.endpoint ?? PUBLIC_ENDPOINT,
            '/sse/u',
            queries,
        ],
        (
            [endpoint, path, queries],
            {
                next,
            }: SWRSubscriptionOptions<
                Record<string, BulkResponse<ProfileResponse>>,
                undefined
            >
        ) => {
            const eventSource = new EventSource(
                `${endpoint}${path}?queries[]=${queries.join('&queries[]=')}`
            );

            eventSource.addEventListener('message', (event) => {
                const response = JSON.parse(event.data) as SSEResponse<
                    BulkResponse<ProfileResponse>
                >;

                next(undefined, (previous) => {
                    return {
                        ...previous,
                        [response.query]: response.response,
                    };
                });
            });

            eventSource.addEventListener('error', () => {
                // Server Sent Events has no proper close event, so we have to rely on the error event
                // to clean up the event source.
                eventSource.close();
            });

            return () => {
                eventSource.close();
            };
        },
        properties.swr
    );
