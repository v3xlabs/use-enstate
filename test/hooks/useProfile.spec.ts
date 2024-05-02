/* eslint-disable sonarjs/no-identical-functions */
import { renderHook, waitFor } from '@testing-library/react';
import { describe, test } from 'vitest';

import { useProfile } from '../../src/hooks/useProfile';
import { ENSTATE_PROFILES } from '../mocks/enstate';

describe('useProfile', () => {
    test('profile should get resolved', async ({ expect }) => {
        const { result } = renderHook(() => useProfile('helgesson.eth'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe(undefined);

        expect(result.current.data).toEqual(ENSTATE_PROFILES['helgesson.eth']);
    });

    test('nonexistent name should error', async ({ expect }) => {
        const { result } = renderHook(() => useProfile('notmocked.eth'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBeInstanceOf(Error);
    });
});
