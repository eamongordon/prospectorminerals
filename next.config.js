/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "ousfgajmtaam7m3j.public.blob.vercel-storage.com" },
            { hostname: "public.blob.vercel-storage.com" },
            { hostname: "res.cloudinary.com" },
            { hostname: "avatar.vercel.sh" },
            { hostname: "avatars.githubusercontent.com" },
            { hostname: "www.google.com" },
        ]
    },
    async redirects() {
        return [
            {
                source: '/post/:path*',
                destination: '/articles/:path*',
                permanent: true,
            },
            {
                source: '/learn',
                destination: '/#explore',
                permanent: false,
            },
            {
                source: '/about-minerals',
                destination: '/minerals',
                permanent: true,
            },
            {
                source: '/mineral-database',
                destination: '/minerals',
                permanent: true,
            },
            {
                source: '/mineral-database/:path*',
                destination: '/minerals/:path*',
                permanent: true,
            },
            {
                source: '/about-localities',
                destination: '/localities',
                permanent: true,
            },
            {
                source: '/locality-database',
                destination: '/localities',
                permanent: true,
            },
            {
                source: '/locality-database/:path*',
                destination: '/localities/:path*',
                permanent: true,
            },
            {
                source: '/locality-map',
                destination: '/localities',
                permanent: true,
            },
            {
                source: '/galleries/:path*',
                destination: '/photos/:path*',
                permanent: false,
            }
        ]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig);
