import { SWRConfiguration } from 'swr';

export type BaseSwrHookProperties = {
    /**
     * Which enstate instance to use.
     * Defaults to the public hosted instance.
     */
    endpoint?: string;
    /**
     * Whether to enable the hook.
     * Defaults to true.
     */
    enabled?: boolean;
    /**
     * SWR configuration.
     */
    swr?: SWRConfiguration;
};
