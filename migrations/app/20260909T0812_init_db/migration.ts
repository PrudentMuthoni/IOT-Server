#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/cd8372153924cbcb443f067fcbac11a36d193b53eb7c1c6ad0c8edd9c65d3827/contract';
import endContract from '../../snapshots/cd8372153924cbcb443f067fcbac11a36d193b53eb7c1c6ad0c8edd9c65d3827/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'readings',
        columns: [
          col('deviceId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('humidity', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('receivedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 3 } },
          }),
          col('temperature', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
