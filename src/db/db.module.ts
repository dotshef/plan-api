import { Global, Module, OnModuleDestroy, Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { createDb, createPool, DRIZZLE } from './client';

const POOL = Symbol('PG_POOL');

const poolProvider: Provider = {
  provide: POOL,
  useFactory: () => createPool(),
};

const dbProvider: Provider = {
  provide: DRIZZLE,
  inject: [POOL],
  useFactory: (pool: Pool) => createDb(pool),
};

@Global()
@Module({
  providers: [poolProvider, dbProvider],
  exports: [DRIZZLE],
})
export class DbModule implements OnModuleDestroy {
  constructor() {}

  // The Pool is managed by Nest's DI; closing on shutdown keeps connections tidy.
  async onModuleDestroy() {
    // no-op: Pool is closed via Nest lifecycle when app shuts down in main.ts
  }
}
