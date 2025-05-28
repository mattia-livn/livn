/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurazione semplificata per Next.js 14
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Escludi pdf-parse dal bundle client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
      }
    }
    
    // Escludi pdf-parse completamente dal client
    config.externals = config.externals || []
    if (!isServer) {
      config.externals.push('pdf-parse')
    }
    
    return config
  },
}

module.exports = nextConfig 