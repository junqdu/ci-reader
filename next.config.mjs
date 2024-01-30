/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'docs',
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/post',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
