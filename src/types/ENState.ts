import { RecordKey } from './RecordKey';

export type ProfileResponse = {
    /** Name */
    name: string;
    /** Ethereum Mainnet Address */
    address?: string;
    /** Avatar URL */
    avatar?: string;
    /** Header URL */
    header?: string;
    /** Preferred Capitalization of Name */
    display: string;
    /** Records */
    records: Record<RecordKey, string>;
    /** Addresses on different chains */
    chains: Record<string, string>;
    /** Unix Timestamp of date it was loaded */
    fresh: number;
    /** Resolver the information was fetched from */
    resolver: string;
    ccip_urls: string[];
    /** Errors encountered while fetching & decoding */
    errors: Record<string, string>;
};

export type BulkResponse<Ok> =
    | ({
          type: 'success';
      } & Ok)
    | {
          type: 'error';
          error: string;
      };

export type ListResponse<T> = {
    response_length: number;
    response: T[];
};

export type SSEResponse<T> = {
    query: string;
    response: T;
};
