/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.fxn.ai" },
    ],
  },
};

export default nextConfig;
