import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { resolveDbConfig } from './config';

export const DRIZZLE = Symbol('DRIZZLE');

export type Database = NodePgDatabase<typeof schema>;

export function createPool(): Pool {
  return new Pool(resolveDbConfig());
}

export function createDb(pool: Pool): Database {
  return drizzle(pool, { schema });
}
