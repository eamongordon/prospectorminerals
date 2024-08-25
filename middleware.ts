import NextAuth from "next-auth"
import authConfig from "@/lib/auth/config"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, `/login?callbackUrl=${encodeURIComponent(req.url)}`)
    return Response.redirect(url)
  } else {
    //Ensure condition yields true when user or roles is undefined
    if ((req.nextUrl.pathname.startsWith('/manage') || req.nextUrl.pathname.startsWith('/sandbox')) && !(req.auth.user?.roles?.includes('Admin') ?? true)) {
      return new Response('Forbidden', { status: 403 });
    }
  }
})

export const config = {
  matcher: ["/manage/:path*", "/account/:path*", "/sandbox"],
}