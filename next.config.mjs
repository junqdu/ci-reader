/** @type {import('next').NextConfig} */
const nextConfig = {
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
