import type { PoolConfig } from 'pg';
import { env } from '../env';

export function resolveDbConfig(): PoolConfig {
  const isUnixSocket = env.db.host.startsWith('/');
  return {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    ssl: isUnixSocket ? false : env.db.ssl,
    // Fail fast instead of hanging forever when the DB is unreachable
    connectionTimeoutMillis: 5_000,
    statement_timeout: 10_000,
    query_timeout: 10_000,
  };
}
