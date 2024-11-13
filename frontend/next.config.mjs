/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'development' 
    ? {} 
    : {
        output: 'export',
        distDir: 'dist',
      }
  ),
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;