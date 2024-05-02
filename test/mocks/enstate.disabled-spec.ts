/* eslint-disable unicorn/no-empty-file */
/**
 * Tests for if the mocks are correct are disabled until a decision is made regarding their strictness.
 */
// import { bypass } from 'msw';
// import { describe, test } from 'vitest';

// import { PUBLIC_ENDPOINT } from '../../src/public';

// // Make sure our mock format is up to date.
// describe('enstate', () => {
//     test(
//         'mocked profile structure matches original',
//         {
//             retry: 3,
//             timeout: 10_000,
//         },
//         async ({ expect }) => {
//             const original = await fetch(
//                 bypass(`${PUBLIC_ENDPOINT}/u/helgesson.eth`)
//             );
//             const originalProfile = await original.json();

//             const mocked = await fetch(`${PUBLIC_ENDPOINT}/u/helgesson.eth`);
//             const mockedProfile = await mocked.json();

//             expect(originalProfile).toEqual({
//                 ...mockedProfile,
//                 fresh: expect.any(Number),
//             });
//         }
//     );

//     test(
//         'mocked missing profile matches original',
//         {
//             retry: 3,
//             timeout: 10_000,
//         },
//         async ({ expect }) => {
//             const original = await fetch(
//                 bypass(`${PUBLIC_ENDPOINT}/u/helgesson.noteth`)
//             );
//             const originalProfile = await original.json();

//             const mocked = await fetch(`${PUBLIC_ENDPOINT}/u/helgesson.noteth`);
//             const mockedProfile = await mocked.json();

//             expect(originalProfile).toEqual(mockedProfile);
//         }
//     );

//     test(
//         'mocked bulk profile structure matches original',
//         {
//             retry: 3,
//             timeout: 10_000,
//         },
//         async ({ expect }) => {
//             const original = await fetch(
//                 bypass(
//                     `${PUBLIC_ENDPOINT}/bulk/u?queries[]=helgesson.eth&queries[]=helgesson.noteth`
//                 )
//             );
//             const originalProfiles = await original.json();

//             const mocked = await fetch(
//                 `${PUBLIC_ENDPOINT}/bulk/u?queries[]=helgesson.eth&queries[]=helgesson.noteth`
//             );
//             const mockedProfiles = await mocked.json();

//             expect(originalProfiles).toEqual({
//                 response_length: mockedProfiles.response_length,
//                 response: mockedProfiles.response.map((profile: any) =>
//                     profile.type === 'error'
//                         ? profile
//                         : {
//                               ...profile,
//                               fresh: expect.any(Number),
//                           }
//                 ),
//             });
//         }
//     );

//     test(
//         'mocked sse profile structure matches original',
//         {
//             retry: 3,
//             timeout: 10_000,
//         },
//         async ({ expect }) => {
//             const original = await fetch(
//                 bypass(`${PUBLIC_ENDPOINT}/sse/u?queries[]=helgesson.eth`)
//             );

//             // console.log(await original.text());
//             const originalText = await original.text();
//             const originalProfile = JSON.parse(
//                 originalText.replace('data: ', '')
//             );

//             const mocked = await fetch(
//                 `${PUBLIC_ENDPOINT}/sse/u?queries[]=helgesson.eth`
//             );
//             const reader = (
//                 mocked.body as unknown as ReadableStream<string>
//             ).getReader();
//             let done = false;
//             let mockedText = '';

//             while (!done) {
//                 const { value, done: done_ } = await reader.read();

//                 done = done_;

//                 if (value) {
//                     mockedText += value;
//                 }
//             }
//             const mockedProfile = JSON.parse(mockedText.replace('data: ', ''));

//             expect(originalProfile).toEqual({
//                 response: {
//                     ...mockedProfile.response,
//                     fresh: expect.any(Number),
//                 },
//                 query: 'helgesson.eth',
//             });
//         }
//     );
// });
