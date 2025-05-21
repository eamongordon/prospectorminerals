import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { baseUrl } from "@/lib/utils";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        roles?: string[]
    }
    interface Token {
        roles?: string[]
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        roles?: string[]
    }
}

export default {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name || profile.email,
                    first_name: profile.given_name,
                    last_name: profile.family_name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        })
    ],
    pages: {
        signIn: `/login`,
        verifyRequest: `/login`,
        error: "/login", // Error code passed in query string as ?error=
    },
    session: { strategy: "jwt" },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#666565", // Hex color code
        logo: `${baseUrl}/_next/image?url=%2FPM-Favicon-New-Square.png&w=128&q=75`, // Absolute URL to image
        buttonText: "#FFFFFF" // Hex color code
    },
    callbacks: {
        jwt: async ({ token, user, trigger, session }) => {
            if (user) {
                token.roles = user.roles;
            }
            if (trigger === "update") {
                const sessionKeyList = Object.keys(session);
                sessionKeyList.forEach(async (key) => {
                    // forbid user from updating roles from client side
                    if (key !== 'roles') {
                        token[key] = session[key];
                    }
                });
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = {
                ...session.user,
                roles: token?.roles,
                ...(token.sub && { id: token.sub }),
            };
            return session;
        }
    }

} satisfies NextAuthConfig