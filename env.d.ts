/// <reference types="@cloudflare/workers-types" />
// Cloudflare Pages Functions (Server-side) environment variables
interface CloudflareEnv {
  DB: D1Database;
  STORAGE: R2Bucket;
}
