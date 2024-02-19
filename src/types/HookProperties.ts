import { SWRConfig } from 'swr';

export type BaseSwrHookProperties = {
    endpoint?: string;
    enabled?: boolean;
    swr?: typeof SWRConfig;
};
