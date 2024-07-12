import NextAuth from "next-auth"
import authConfig from "@/lib/auth/auth.config"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  console.log("AUTH REQ");
  console.log(req.auth);
  console.log("ALL REQ");
  console.log(req);
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, `/login?callbackUrl=${encodeURIComponent(req.url)}`)
    return Response.redirect(url)
  }
})

export const config = {
  matcher: ["/manage/:path*", "/account/:path*"],
}