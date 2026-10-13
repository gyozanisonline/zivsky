/** @type {import('next').NextConfig} */
const nextConfig = {
  // Links shared before the site became one English wall still land somewhere real:
  // the Hebrew pages, the old /en prefix, and the index and sort pages are all gone.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/works/:slug", destination: "/works/:slug", permanent: false },
      { source: "/he", destination: "/", permanent: false },
      { source: "/he/works/:slug", destination: "/works/:slug", permanent: false },
      { source: "/he/:path*", destination: "/", permanent: false },
      { source: "/list", destination: "/", permanent: false },
      { source: "/list/:path*", destination: "/", permanent: false },
      { source: "/sort/:path*", destination: "/", permanent: false },
    ]
  },
}

export default nextConfig
