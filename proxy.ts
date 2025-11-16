import NextAuth from "next-auth"
import authConfig from "@/lib/auth/config"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
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
})

export const config = {
  matcher: ["/manage/:path*", "/account/:path*", "/sandbox", "/login", "/signup"]
}
