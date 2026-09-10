/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow vendor cover photos hosted anywhere for now.
    // Tighten this to specific domains once vendors upload via a fixed host (e.g. Firebase Storage).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
