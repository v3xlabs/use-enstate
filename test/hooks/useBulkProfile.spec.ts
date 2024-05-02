/* eslint-disable sonarjs/no-identical-functions */
import { renderHook, waitFor } from '@testing-library/react';
import { describe, test } from 'vitest';

import { useBulkProfile } from '../../src/hooks/useBulkProfile';
import { ENSTATE_PROFILES } from '../mocks/enstate';

describe('useBulkProfile', () => {
    test('profiles should get resolved', async ({ expect }) => {
        const { result } = renderHook(() =>
            useBulkProfile(['helgesson.eth', 'helgesson.noteth'])
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe(undefined);

        expect(result.current.data).toEqual({
            response_length: 2,
            response: [
                {
                    type: 'success',
                    ...ENSTATE_PROFILES['helgesson.eth'],
                },
                {
                    type: 'error',
                    status: 404,
                    error: 'Not Found',
                },
            ],
        });
    });
});
