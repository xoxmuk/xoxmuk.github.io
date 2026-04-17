import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.0.0.1'],
  images: {
    // All images in /public are served locally — no remote patterns needed.
    // Add external domains here if you reference remote images:
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
    unoptimized: false,
  },
};

export default nextConfig;
