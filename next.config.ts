import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Media served from Vercel Blob in production; local `staticDir` uploads
    // stay same-origin and need no pattern.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    // AVIF first (roughly 20-30% smaller than WebP at equal quality), WebP as
    // the fallback for browsers that don't accept it.
    formats: ["image/avif", "image/webp"],
    // Catalog imagery is replaced rarely; keep optimized variants warm for a
    // month instead of re-encoding on every cache miss.
    minimumCacheTTL: 2678400,
  },
  // sharp's native binding loads `libvips-cpp.so` through dlopen, which static
  // file tracing cannot see, so the shared library can be left out of the
  // serverless bundle even though the binding itself is included. Shipping the
  // whole `@img` tree keeps the two together. Only the platform's own binaries
  // exist in any given install, so this costs nothing on other platforms.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/@img/**"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
