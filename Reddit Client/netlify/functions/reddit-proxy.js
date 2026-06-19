import { handleRedditRequest } from '../../lib/redditProxy.js';

export default async (req) => {
    try {
        const url = new URL(req.url);
        const redditPath = url.pathname.replace('/.netlify/functions/reddit-proxy', '');
        const data = await handleRedditRequest(redditPath, url.search);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

    } catch (error) {
        console.error('Proxy error:', error);
        const message = error instanceof Error ? error.message : 'Internal proxy error';
        const status = message.includes('429') ? 429 : message.includes('RSS error') ? 502 : 500;

        return new Response(
            JSON.stringify({ error: message }),
            { 
                status,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
};

export const config = {
    path: "/.netlify/functions/reddit-proxy/*"
};