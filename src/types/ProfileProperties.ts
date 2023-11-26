import { SWRConfig } from 'swr';
import { NameOrAddress } from './NameOrAddress';
import { RecordKey } from './RecordKey';

export type ProfileProperties = NameOrAddress & {
    endpoint?: string;
    keys: RecordKey[];
};

export type ProfileHookProperties = ProfileProperties & {
    enabled?: boolean;
    swr?: typeof SWRConfig;
}