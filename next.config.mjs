/** @type {import('next').NextConfig} */
const nextConfig = {
  // English moved to "/" on 2026-09-15; links shared before that still land.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/works/:slug", destination: "/works/:slug", permanent: false },
    ]
  },
}

export default nextConfig
