/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['flagcdn.com', 'upload.wikimedia.org'],
    }
};

export default nextConfig;
