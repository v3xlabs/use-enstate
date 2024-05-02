/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-identical-functions */
import { renderHook, waitFor } from '@testing-library/react';
import { describe, test } from 'vitest';

import { useStreamingBulkProfile } from '../../src/hooks/useSSEProfiles';
import { ENSTATE_PROFILES } from '../mocks/enstate';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('useStreamingBulkProfile', () => {
    test('profiles should get resolved', async ({ expect }) => {
        const { result } = renderHook(() =>
            useStreamingBulkProfile(['helgesson.eth', 'helgesson.noteth'])
        );

        await sleep(800);

        expect(result.current.isLoading, 'Completed too early').toBe(true);
        expect(result.current.error, 'Unexpected error occurred').toBe(
            undefined
        );
        expect(
            result.current.data?.['helgesson.eth'],
            'First entry not yet resolved'
        ).toEqual({
            type: 'success',
            ...ENSTATE_PROFILES['helgesson.eth'],
        });

        // Wait for it to complete
        await waitFor(
            () => {
                expect(result.current.isLoading).toBe(false);
            },
            {
                interval: 250,
                timeout: 5000,
            }
        );

        expect(result.current.error, 'Unexpected error occurred').toBe(
            undefined
        );

        expect(result.current.data, 'Data mismatch').toEqual({
            'helgesson.eth': {
                type: 'success',
                ...ENSTATE_PROFILES['helgesson.eth'],
                fresh: expect.any(Number),
            },
            'helgesson.noteth': {
                type: 'error',
                status: 404,
                error: 'Not Found',
            },
        });
    });
});
