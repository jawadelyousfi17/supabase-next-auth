/**
 * Validate required environment variables
 * This runs at build time to catch configuration issues early
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'DATABASE_URL',
  'NEXT_PUBLIC_APP_URL',
] as const;

const optionalEnvVars = [
  'SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET',
  'NODE_ENV',
] as const;

export function validateEnv() {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Check for localhost in production
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_PUBLIC_APP_URL?.includes('localhost')) {
      warnings.push(
        'NEXT_PUBLIC_APP_URL contains localhost in production environment'
      );
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('localhost')) {
      warnings.push(
        'NEXT_PUBLIC_SUPABASE_URL contains localhost in production environment'
      );
    }
  }

  // Throw error if required variables are missing
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}\n\nPlease check your .env file.`
    );
  }

  // Log warnings
  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    warnings.forEach((warning) => console.warn(`   - ${warning}`));
  }

  // Log optional missing variables
  const missingOptional = optionalEnvVars.filter(
    (envVar) => !process.env[envVar]
  );
  if (missingOptional.length > 0 && process.env.NODE_ENV !== 'production') {
    console.info('ℹ️  Optional environment variables not set:');
    missingOptional.forEach((envVar) => console.info(`   - ${envVar}`));
  }
}

// Helper to get env variable with fallback
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || fallback!;
}

// Export typed env variables
export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
} as const;
