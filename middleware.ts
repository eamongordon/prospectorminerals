export { default } from "next-auth/middleware"

export const config = { matcher: ["/manage/:path*", "/account/:path*"] };