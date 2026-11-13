const COLLECT_URL = process.env.COOKIELESS_COLLECT_URL ?? 'https://api.cookieless.tech/collect';
const SITE_ID = process.env.COOKIELESS_SITE_ID ?? '8d1abeb0-46c9-4145-bcd5-e1b1e7efbee8';
const RANGE_TTL_MS = 6 * 60 * 60 * 1000;

type AiBot = { name: string; group: 'openai' | 'other_ai'; rangesUrl?: string };

const OPENAI_BOTS: AiBot[] = [
  { name: 'ChatGPT-User', group: 'openai', rangesUrl: 'https://openai.com/chatgpt-user.json' },
  { name: 'OAI-SearchBot', group: 'openai', rangesUrl: 'https://openai.com/searchbot.json' },
  { name: 'GPTBot', group: 'openai', rangesUrl: 'https://openai.com/gptbot.json' },
  { name: 'OAI-AdsBot', group: 'openai', rangesUrl: 'https://openai.com/adsbot.json' },
];

const OTHER_AI_BOTS: AiBot[] = [
  'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'Google-Extended', 'GoogleOther', 'Google-CloudVertexBot', 'Gemini-Deep-Research', 'Applebot-Extended',
  'Amazonbot', 'Bytespider', 'meta-externalagent', 'meta-externalfetcher', 'CCBot', 'DuckAssistBot',
  'MistralAI-User', 'cohere-ai', 'YouBot',
].map((name) => ({ name, group: 'other_ai' }));

const AI_BOTS = [...OPENAI_BOTS, ...OTHER_AI_BOTS].map((bot) => ({ bot, pattern: bot.name.toLowerCase() }));

export function matchAiBot(userAgent: string | null): AiBot | null {
  if (!userAgent) return null;
  const ua = userAgent.toLowerCase();
  return AI_BOTS.find(({ pattern }) => ua.includes(pattern))?.bot ?? null;
}

type Parsed = { bits: 32 | 128; value: bigint };

function parseIp(ip: string): Parsed | null {
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(ip);
  const text = mapped ? mapped[1] : ip;
  if (text.includes('.')) {
    const parts = text.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) return null;
    return { bits: 32, value: parts.reduce((acc, p) => (acc << BigInt(8)) | BigInt(p), BigInt(0)) };
  }
  const [head, tail, extra] = text.split('::');
  if (extra !== undefined) return null;
  const headGroups = head ? head.split(':') : [];
  const tailGroups = tail ? tail.split(':') : [];
  const missing = 8 - headGroups.length - tailGroups.length;
  if (tail === undefined ? missing !== 0 : missing < 1) return null;
  const groups = [...headGroups, ...Array(tail === undefined ? 0 : missing).fill('0'), ...tailGroups];
  if (groups.some((g) => !/^[0-9a-f]{1,4}$/i.test(g))) return null;
  return { bits: 128, value: groups.reduce((acc, g) => (acc << BigInt(16)) | BigInt(parseInt(g, 16)), BigInt(0)) };
}

function inCidr(ip: Parsed, cidr: string): boolean {
  const [base, lengthText] = cidr.split('/');
  const network = parseIp(base);
  const length = Number(lengthText);
  if (!network || network.bits !== ip.bits || !Number.isInteger(length) || length < 0 || length > ip.bits) return false;
  const shift = BigInt(ip.bits - length);
  return ip.value >> shift === network.value >> shift;
}

const rangeCache = new Map<string, { fetchedAt: number; prefixes: string[] }>();

async function getPrefixes(url: string): Promise<string[] | null> {
  const cached = rangeCache.get(url);
  if (cached && Date.now() - cached.fetchedAt < RANGE_TTL_MS) return cached.prefixes;
  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { prefixes?: { ipv4Prefix?: string; ipv6Prefix?: string }[] };
    const prefixes = (body.prefixes ?? []).map((p) => p.ipv4Prefix ?? p.ipv6Prefix).filter((p): p is string => !!p);
    if (prefixes.length === 0) throw new Error('empty prefix list');
    rangeCache.set(url, { fetchedAt: Date.now(), prefixes });
    return prefixes;
  } catch (error) {
    console.error('bot-log: range fetch failed', url, error instanceof Error ? error.message : error);
    // A stale list beats none; an IP that fails a stale list is still reported as unverified.
    return cached?.prefixes ?? null;
  }
}

async function verifyIp(bot: AiBot, ip: string | null): Promise<boolean | 'unknown'> {
  if (!bot.rangesUrl) return 'unknown';
  const parsed = ip ? parseIp(ip) : null;
  if (!parsed) return false;
  const prefixes = await getPrefixes(bot.rangesUrl);
  if (!prefixes) return 'unknown';
  return prefixes.some((cidr) => inCidr(parsed, cidr));
}

export type BotHit = {
  bot: AiBot;
  userAgent: string;
  ip: string | null;
  method: string;
  path: string;
  query: string;
  hostname: string;
  referrer: string | null;
};

export async function logBotHit(hit: BotHit): Promise<void> {
  const timestamp = new Date().toISOString();
  const ipVerified = await verifyIp(hit.bot, hit.ip);
  const properties = {
    bot: hit.bot.name,
    bot_group: hit.bot.group,
    bot_ip: hit.ip ?? 'unknown',
    ip_verified: ipVerified,
    user_agent: hit.userAgent,
    method: hit.method,
    ...(hit.query ? { query: hit.query } : {}),
  };
  // Vercel runtime logs double as a second record if the ingest call fails.
  console.log(JSON.stringify({ msg: 'ai_bot_request', timestamp, path: hit.path, ...properties }));
  try {
    const res = await fetch(COLLECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // /collect classifies the actor from these, so it sees the bot rather than this server.
        'User-Agent': hit.userAgent,
        ...(hit.ip ? { 'X-Forwarded-For': hit.ip } : {}),
      },
      body: JSON.stringify({
        siteId: SITE_ID,
        type: 'event',
        name: 'ai_bot_request',
        path: hit.path,
        hostname: hit.hostname,
        timestamp,
        ...(hit.referrer ? { referrer: hit.referrer } : {}),
        custom_properties: properties,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error('bot-log: collect returned', res.status);
  } catch (error) {
    console.error('bot-log: collect failed', error instanceof Error ? error.message : error);
  }
}
