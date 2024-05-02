import EventSource from 'eventsource';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { enstateHandlers } from './mocks/enstate';

// Happy DOM's URL implementation is not complete, so we need to use Node's URL.
// @ts-ignore
// globalThis.URL = URL;
globalThis.EventSource = EventSource;

export const server = setupServer(...enstateHandlers);

beforeAll(() => {
    // Enable API mocking before tests.
    server.listen();
});

afterAll(() => {
    // Close the server after tests.
    server.close();
});

afterEach(() => {
    // Reset any runtime request handlers we may add during the tests.
    server.resetHandlers();
});
