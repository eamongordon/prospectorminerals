/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: process.env.BLOB_HOSTNAME },
            { hostname: "lh3.googleusercontent.com", pathname: '/a/**' },
        ],
        qualities: [25, 50, 75]
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
                destination: '/photos?search=:path*',
                permanent: false,
            }
        ]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig);
