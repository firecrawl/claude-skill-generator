/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  transpilePackages: ["shiki"],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors/warnings.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "service.firecrawl.dev",
        pathname: "/storage/v1/object/public/media/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/firecrawl-scrape-media/**",
      },
      {
        protocol: "https",
        hostname: "og-image.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/fire-enrich",
        destination: "/blog/fire-enrich",
        permanent: true,
      },
      {
        source: "/firestarter",
        destination: "/blog/firestarter-rag-chatbot-generator",
        permanent: true,
      },
      {
        source: "/deep-research",
        destination: "/blog/deep-research-api",
        permanent: true,
      },
      {
        source: "/fireplexity",
        destination: "/blog/introducing-fireplexity-open-source-answer-engine",
        permanent: true,
      },
      // Blog category redirects
      {
        source: "/blog/category/tutorials",
        destination: "/blog/category/use-cases-and-examples",
        permanent: true,
      },
      {
        source: "/blog/category/Tutorials",
        destination: "/blog/category/use-cases-and-examples",
        permanent: true,
      },
      // Redirect old encoded URLs to new human-readable ones
      {
        source: "/blog/category/Use%20Cases%20%26%20Examples",
        destination: "/blog/category/use-cases-and-examples",
        permanent: true,
      },
      {
        source: "/blog/category/Product%20Updates",
        destination: "/blog/category/product-updates",
        permanent: true,
      },
      {
        source: "/blog/category/Customer%20Stories",
        destination: "/blog/category/customer-stories",
        permanent: true,
      },
      {
        source: "/blog/category/Web%20Extraction%20Mastery",
        destination: "/blog/category/web-extraction-mastery",
        permanent: true,
      },
      {
        source: "/blog/category/AI%20Engineering",
        destination: "/blog/category/ai-engineering",
        permanent: true,
      },
      {
        source: "/blog/category/Workflows%20%26%20Automation",
        destination: "/blog/category/workflows-and-automation",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents framing
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Disables MIME sniffing
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Limits referrer info
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self)",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
