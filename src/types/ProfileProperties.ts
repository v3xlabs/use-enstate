import { NameOrAddress } from './NameOrAddress';
import { RecordKey } from './RecordKey';

export type ProfileProperties = NameOrAddress & {
    endpoint?: string;
    keys: RecordKey[];
};
