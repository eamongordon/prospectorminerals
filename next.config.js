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
    }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig);
