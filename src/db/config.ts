import type { PoolConfig } from 'pg';
import { env } from '../env';

export function resolveDbConfig(): PoolConfig {
  return {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    ssl: env.db.ssl,
  };
}
