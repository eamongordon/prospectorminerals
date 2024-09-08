import NextAuth from "next-auth"
import authConfig from "@/lib/auth/config"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (req.auth) {
    const isAdmin = req.auth.user?.roles?.includes('Admin') ?? false;

    if ((pathname.startsWith('/manage') || pathname.startsWith('/sandbox')) && !isAdmin) {
      return new Response('Forbidden', { status: 403 });
    }

    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      const url = req.url.replace(pathname, '/account/settings');
      return Response.redirect(url);
    }
  } else {
    if (!pathname.startsWith('/login')) {
      const url = req.url.replace(pathname, `/login?callbackUrl=${encodeURIComponent(req.url)}`);
      return Response.redirect(url);
    }
  }
})

export const config = {
  matcher: ["/manage/:path*", "/account/:path*", "/sandbox", "/login", "/signup"]
}