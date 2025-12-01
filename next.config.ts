import type { NextConfig } from 'next';

// Validate environment variables at build time
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    'DATABASE_URL',
    'NEXT_PUBLIC_APP_URL',
  ];

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for production:\n${missing.join('\n')}`
    );
  }

  // Warn if localhost is used in production
  if (process.env.NEXT_PUBLIC_APP_URL?.includes('localhost')) {
    console.warn(
      '⚠️  WARNING: NEXT_PUBLIC_APP_URL contains localhost in production!'
    );
  }
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: appUrl.startsWith('https') ? 'https' : 'http',
        hostname: new URL(appUrl).hostname,
        pathname: '/icons/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),
};

export default nextConfig;
