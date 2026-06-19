export default async (req) => {
    try {
        const url = new URL(req.url);
        const redditPath = url.pathname.replace('/.netlify/functions/reddit-proxy', '');
        const redditUrl = `https://www.reddit.com${redditPath}${url.search}`;

        const response = await fetch(redditUrl, {
            headers: {
                // Make it look more like a real browser / unique app
                'User-Agent': 'Mozilla/5.0 (compatible; Reddit-Clone/1.0; +https://your-site-name.netlify.app)',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Reddit returned ${response.status} for ${redditUrl}`);
            const errorText = await response.text();
            return new Response(
                JSON.stringify({ error: `Reddit API error: ${response.status}` }),
                { 
                    status: response.status,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal proxy error' }),
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