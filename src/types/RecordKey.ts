export type ExampleRecordKey =
    | 'com.github'
    | 'com.twitter'
    | 'org.telegram'
    | 'description'
    | 'email'
    | 'location'
    | 'timezone'
    | 'url';

export type RecordKey = ExampleRecordKey | (string & {});
