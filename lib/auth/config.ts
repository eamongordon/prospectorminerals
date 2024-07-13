import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

declare module "next-auth" {
    interface User {
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
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    gh_username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                };
            },
        }),
    ],
    pages: {
        signIn: `/login`,
        verifyRequest: `/login`,
        error: "/login", // Error code passed in query string as ?error=
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#666565", // Hex color code
        //DOMAIN_UPDATE
        logo: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/_next/image?url=%2FPM-Favicon-New-Square.png&w=128&q=75`, // Absolute URL to image
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
                    token[key] = session[key];
                    //@ts-expect-error;
                    if (token?.user && token?.user[key]) {
                        if (key !== 'password') {
                            //@ts-expect-error;
                            token.user[key] = session[key];
                        }
                    }
                });
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = {
                ...session.user,
                // @ts-expect-error
                roles: token?.roles,
                // @ts-expect-error
                id: token?.sub,
                // @ts-expect-error
                username: token?.user?.username || token?.user?.gh_username,
            };
            return session;
        },
        signIn: async ({ user, profile }) => {
            if (!profile) {
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: user.email || undefined
                    },
                });
                if (userExists) {
                    return true;   //if the email exists in the User collection, email them a magic login link
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
    }

} satisfies NextAuthConfig