import 'dotenv/config';

function required(key: string): string {
  const v = process.env[key];
  if (!v) {
    // Flush to stderr immediately so Cloud Run captures it before crash
    process.stderr.write(`[ENV] Missing required env var: ${key}\n`);
    throw new Error(`Env var ${key} is required`);
  }
  return v;
}

process.stderr.write(`[ENV] Booting with NODE_ENV=${process.env.NODE_ENV}, PORT=${process.env.PORT}\n`);

export const env = {
  db: {
    host: required('DB_HOST'),
    port: 5432,
    name: required('DB_NAME'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    ssl: { rejectUnauthorized: false } as const,
  },
  port: Number(process.env.PORT ?? 8080),
  corsOrigins: (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  logLevel: process.env.LOG_LEVEL ?? 'info',
};
