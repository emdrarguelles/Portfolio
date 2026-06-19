export default async (req) => {
    const url = new URL(req.url);
    const redditPath = url.pathname.replace('/.netlify/functions/reddit-proxy', '');
    const redditUrl = `https://www.reddit.com${redditPath}${url.search}`;
  
    const response = await fetch(redditUrl, {
      headers: {
        'User-Agent': 'web:reddit-client:v1.0 (by /u/emdrargon)'
      }
    });
  
    const data = await response.text();
  
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };
  
  export const config = {
    path: "/.netlify/functions/reddit-proxy/*"
  };