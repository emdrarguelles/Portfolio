export default async (req) => {
    try {
        const url = new URL(req.url);
        const redditPath = url.pathname.replace('/.netlify/functions/reddit-proxy', '');
        const redditUrl = `https://www.reddit.com${redditPath}${url.search}`;

        const response = await fetch(redditUrl, {
            headers: {
                'User-Agent': 'web:reddit-client:v1.0 (by /u/emdrargon)'
            }
        });

        const contentType = response.headers.get('content-type') || '';
        let data;

        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Return with correct content type
        return new Response(
            typeof data === 'string' ? data : JSON.stringify(data),
            {
                status: response.status,
                headers: {
                    'Content-Type': contentType.includes('application/json') 
                        ? 'application/json' 
                        : 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                }
            }
        );

    } catch (error) {
        console.error('Proxy error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch from Reddit' }),
            { 
                status: 500,
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