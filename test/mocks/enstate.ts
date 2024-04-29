import { type RequestHandler, delay, http, HttpResponse } from 'msw';

import { BulkResponse, ListResponse, ProfileResponse } from '../../src';
import { PUBLIC_ENDPOINT } from '../../src/public';

export const ENSTATE_PROFILES = {
    'helgesson.eth': {
        name: 'helgesson.eth',
        address: '0xd577D1322cB22eB6EAC1a008F62b18807921EFBc',
        avatar: 'https://cloudflare-ipfs.com/ipfs/bafkreigiqg7bxushl3ogmdavtuk5jsh3g4xbyskn3blqu4kaw2wj4odgp4',
        display: 'helgesson.eth',
        records: {
            avatar: 'ipfs://bafkreigiqg7bxushl3ogmdavtuk5jsh3g4xbyskn3blqu4kaw2wj4odgp4',
            'com.discord': 'Svemat#5531',
            'com.github': 'svemat01',
            'com.twitter': 'Helgesson_',
            email: 'jakob@helgesson.dev',
            'org.telegram': 'helgesson',
            url: 'https://jakobhelgesson.com',
        },
        chains: { eth: '0xd577D1322cB22eB6EAC1a008F62b18807921EFBc' },
        fresh: 1_713_614_302_970,
        resolver: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
        errors: { contenthash: 'ContentHashDecodeError' },
    },
    'luc.eth': {
        name: 'luc.eth',
        address: '0x225f137127d9067788314bc7fcc1f36746a3c3B5',
        avatar: 'https://cloudflare-ipfs.com/ipfs/bafkreifnrjhkl7ccr2ifwn2n7ap6dh2way25a6w5x2szegvj5pt4b5nvfu',
        header: 'https://cloudflare-ipfs.com/ipfs/bafkreie5e6fkxltkyyn3q5hwblhd3c42mpwlqnis2a6hmfwitzdgbt7zdu',
        display: 'luc.eth',
        records: {
            avatar: 'ipfs://bafkreifnrjhkl7ccr2ifwn2n7ap6dh2way25a6w5x2szegvj5pt4b5nvfu',
            'com.discord': 'lucemans',
            'com.github': 'lucemans',
            'com.twitter': 'lucemansnl',
            description: 'Create Epic Shit, DevRel @ ENS, Researcher @ V3X',
            email: 'luc@lucemans.nl',
            header: 'ipfs://bafkreie5e6fkxltkyyn3q5hwblhd3c42mpwlqnis2a6hmfwitzdgbt7zdu',
            location: 'Breda, NL',
            name: 'luc',
            'org.telegram': 'lucemans',
            timezone: 'Etc/UTC',
            url: 'https://luc.computer',
        },
        chains: {
            eth: '0x225f137127d9067788314bc7fcc1f36746a3c3B5',
        },
        fresh: 1_713_619_113_193,
        resolver: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
        errors: {
            contenthash: 'ContentHashDecodeError',
        },
    },
} satisfies Record<string, ProfileResponse>;

export const enstateHandlers: RequestHandler[] = [
    // Single endpoint
    http.get(`${PUBLIC_ENDPOINT}/u/:query`, async ({ params }) => {
        await delay(200);

        const { query } = params;

        const profile: ProfileResponse =
            ENSTATE_PROFILES[query as keyof typeof ENSTATE_PROFILES];

        if (!profile) {
            return HttpResponse.json(
                {
                    status: 404,
                    error: 'Not Found',
                },
                {
                    status: 404,
                }
            );
        }

        return HttpResponse.json(profile);
    }),
    // Bulk endpoint
    http.get(`${PUBLIC_ENDPOINT}/bulk/u`, async ({ request }) => {
        const url = new URL(request.url);

        await delay(200);

        const queries: string[] = url.searchParams.getAll('queries[]');

        const profiles: BulkResponse<ProfileResponse>[] = queries.map(
            (query) => {
                const profile: ProfileResponse =
                    ENSTATE_PROFILES[query as keyof typeof ENSTATE_PROFILES];

                if (!profile) {
                    return {
                        type: 'error' as const,
                        status: 404,
                        error: 'Not Found',
                    };
                }

                return {
                    type: 'success' as const,
                    ...profile,
                };
            }
        );

        const result: ListResponse<BulkResponse<ProfileResponse>> = {
            response_length: profiles.length,
            response: profiles,
        };
        // HttpResponse.

        return HttpResponse.json(result);
    }),
    // SSE endpoint
    http.get(`${PUBLIC_ENDPOINT}/sse/u`, async ({ request }) => {
        const url = new URL(request.url);

        await delay(200);

        const queries = url.searchParams.getAll('queries[]');

        const stream = new ReadableStream({
            async start(controller) {
                for (const query of queries) {
                    await delay(500);

                    const profile: ProfileResponse =
                        ENSTATE_PROFILES[
                            query as keyof typeof ENSTATE_PROFILES
                        ];

                    if (!profile) {
                        controller.enqueue(
                            `data: ${JSON.stringify({
                                query,
                                response: {
                                    type: 'error',
                                    status: 404,
                                    error: 'Not Found',
                                },
                            })}\n\n`
                        );
                        continue;
                    }

                    controller.enqueue(
                        `data: ${JSON.stringify({
                            query,
                            response: {
                                type: 'success',
                                ...profile,
                            },
                        })}\n\n`
                    );
                }

                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
            },
        });
    }),
];
