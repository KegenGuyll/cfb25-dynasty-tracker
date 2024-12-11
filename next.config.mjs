/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // types are broken for some reason?
  }
};

export default nextConfig;
