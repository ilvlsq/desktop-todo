import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const poolProvider = {
  provide: 'PG_POOL',
  useFactory: () => {
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CERTIFICATE,
      },
    });
  },
};

@Module({
  providers: [poolProvider],
  exports: [poolProvider],
})
export class DatabaseModule {}
