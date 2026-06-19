// @ts-nocheck

const REDDIT_ORIGIN = 'https://www.reddit.com';
const USER_AGENT = 'reddit-client-portfolio/1.0 (RSS reader)';

let lastRequestAt = 0;
const MIN_REQUEST_GAP_MS = 1500;

async function waitForRateLimit() {
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < MIN_REQUEST_GAP_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_GAP_MS - elapsed));
  }
  lastRequestAt = Date.now();
}

function mapJsonPathToRssUrl(pathname, search) {
  let rssPath = pathname;

  if (pathname.endsWith('.json')) {
    rssPath = `${pathname.slice(0, -5)}.rss`;
  }

  return `${REDDIT_ORIGIN}${rssPath}${search}`;
}

function getTagValue(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? decodeXml(match[1].trim()) : null;
}

function getAttrValue(block, tag, attr) {
  const match = block.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"[^>]*\\/?>`));
  return match ? decodeXml(match[1]) : null;
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPostId(link) {
  const match = link.match(/\/comments\/([a-z0-9]+)\//i);
  return match ? match[1] : null;
}

function extractRedditId(entryBlock, link) {
  const idTag = getTagValue(entryBlock, 'id') ?? '';
  const fromTag = idTag.match(/^t[0-9]+_(.+)$/i);
  if (fromTag) {
    return fromTag[1];
  }

  return extractPostId(link) ?? '';
}

function parseAtomEntry(entryBlock) {
  const title = getTagValue(entryBlock, 'title') ?? '';
  const authorRaw = getTagValue(entryBlock, 'name') ?? '';
  const author = authorRaw.replace(/^\/u\//, '');
  const subreddit = getAttrValue(entryBlock, 'category', 'term') ?? '';
  const url = getAttrValue(entryBlock, 'link', 'href') ?? getTagValue(entryBlock, 'id') ?? '';
  const id = extractRedditId(entryBlock, url);
  const content = getTagValue(entryBlock, 'content') ?? '';
  const thumbnail =
    getAttrValue(entryBlock, 'media:thumbnail', 'url') ??
    getAttrValue(entryBlock, 'media:content', 'url');

  return {
    id,
    title,
    author,
    subreddit,
    url,
    body: stripHtml(content),
    thumbnail: thumbnail && !thumbnail.startsWith('self') ? thumbnail : null,
  };
}

function parseAtomFeed(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    entries.push(parseAtomEntry(match[1]));
  }

  return entries;
}

function toListingResponse(entries) {
  return {
    data: {
      children: entries.map((entry) => ({
        data: {
          id: entry.id,
          title: entry.title,
          author: entry.author,
          score: 0,
          num_comments: 0,
          subreddit: entry.subreddit,
          url: entry.url,
          thumbnail: entry.thumbnail,
          display_name: entry.subreddit,
          community_icon: null,
          icon_img: null,
        },
      })),
    },
  };
}

function toCommentsResponse(entries) {
  if (entries.length === 0) {
    return [{ data: { children: [] } }, { data: { children: [] } }];
  }

  const [postEntry, ...commentEntries] = entries;

  return [
    {
      data: {
        children: [
          {
            data: {
              id: postEntry.id,
              title: postEntry.title,
              author: postEntry.author,
              score: 0,
              num_comments: commentEntries.length,
              subreddit: postEntry.subreddit,
              url: postEntry.url,
              thumbnail: postEntry.thumbnail,
            },
          },
        ],
      },
    },
    {
      data: {
        children: commentEntries.map((entry) => ({
          kind: 't1',
          data: {
            id: entry.id,
            author: entry.author,
            author_icon: null,
            body: entry.body,
            score: 0,
            replies: '',
          },
        })),
      },
    },
  ];
}

async function fetchRssWithRetry(url, maxRetries = 6) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    await waitForRateLimit();

    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/atom+xml, application/xml, text/xml, */*',
      },
    });

    if (response.status === 429 && attempt < maxRetries) {
      const retryAfter = Number.parseInt(response.headers.get('Retry-After') ?? '', 10);
      const delayMs = Number.isNaN(retryAfter)
        ? Math.min(30000, 2000 * 2 ** attempt)
        : retryAfter * 1000;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      continue;
    }

    if (!response.ok) {
      throw new Error(`Reddit RSS error: ${response.status}`);
    }

    return response.text();
  }

  throw new Error('Reddit RSS error: 429');
}

let requestQueue = Promise.resolve();

function enqueueRequest(task) {
  const run = requestQueue.then(task);
  requestQueue = run.catch(() => {});
  return run;
}

export async function handleRedditRequest(pathname, search = '') {
  return enqueueRequest(async () => {
    const rssUrl = mapJsonPathToRssUrl(pathname, search);
    const xml = await fetchRssWithRetry(rssUrl);
    const entries = parseAtomFeed(xml);

    if (pathname.startsWith('/comments/')) {
      return toCommentsResponse(entries);
    }

    return toListingResponse(entries);
  });
}
