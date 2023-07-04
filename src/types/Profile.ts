import { RecordKey } from './RecordKey';

export type Profile = {
    name: string;
    address: `0x${string}`;
    avatar: string;
    display: string;
    records: Record<RecordKey, string>;
};
