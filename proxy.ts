import NextAuth from "next-auth"
import type { NextFetchEvent, NextRequest } from "next/server"
import authConfig from "@/lib/auth/config"
import { logBotHit, matchAiBot } from "@/lib/bot-log"

export const { auth } = NextAuth(authConfig)

const authProxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  if (req.auth) {
    const isAdmin = req.auth.user?.roles?.includes('Admin') ?? false;

    if ((pathname.startsWith('/manage') || pathname.startsWith('/sandbox')) && !isAdmin) {
      return new Response('Forbidden', { status: 403 });
    }

    if (pathname === '/login' || pathname === '/signup' && !searchParams.has('callbackUrl')) {
      const redirectUrl = req.url.replace(pathname, '/account/settings');
      return Response.redirect(redirectUrl);
    }
  } else {
    if (pathname !== '/login' && pathname !== '/signup') {
      const redirectUrl = req.url.replace(pathname, `/login?callbackUrl=${encodeURIComponent(req.url)}`);
      return Response.redirect(redirectUrl);
    }
  }
}) as unknown as (req: NextRequest, event: NextFetchEvent) => Response | Promise<Response | undefined> | undefined

const AUTH_PATHS = /^\/(manage|account)(\/|$)|^\/(sandbox|login|signup)$/

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  const userAgent = req.headers.get('user-agent');
  const bot = matchAiBot(userAgent);
  if (bot && userAgent) {
    // Only matched AI bots are logged; human visitors' IPs are never read or stored.
    const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
    event.waitUntil(logBotHit({
      bot,
      userAgent,
      ip,
      method: req.method,
      path: req.nextUrl.pathname,
      query: req.nextUrl.search,
      hostname: req.nextUrl.hostname,
      referrer: req.headers.get('referer'),
    }));
  }

  if (AUTH_PATHS.test(req.nextUrl.pathname)) return authProxy(req, event);
}

export const config = {
  // Every request except API routes, build output and static files, so cached pages are still seen.
  matcher: ["/((?!api/|_next/|.*\\.(?:ico|png|jpe?g|gif|svg|webp|avif|css|js|map|woff2?|ttf|otf|mp4|webm|json)$).*)"]
}
