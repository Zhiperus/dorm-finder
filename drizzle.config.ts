import { defineConfig } from 'drizzle-kit';

const requiredEnvs = ['DB_USER', 'DB_PASSWORD', 'DB_NAME'];

for (const key of requiredEnvs) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is missing from your .env file.`);
  }
}

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/server/db/drizzle-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.ENV === 'dev' ? 'localhost' : process.env.DB_HOST}:5432/${process.env.DB_NAME}?sslmode=disable`
  },
  breakpoints: false,
  verbose: true,
  strict: true,
  migrations: {
    table: 'migrations',
    schema: 'public'
  }
});
