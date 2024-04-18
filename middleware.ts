export { default } from "next-auth/middleware"

//produces callbackUrl param
export const config = { matcher: ["/manage/:path*", "/account/:path*"] };