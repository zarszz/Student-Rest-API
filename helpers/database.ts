import { Client } from "https://deno.land/x/postgres/mod.ts";
import { CONFIG } from "../env.ts";

export const client = new Client({
    hostname: CONFIG.DB_HOSTNAME,
    port: parseInt(CONFIG.DB_PORT),
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    database: CONFIG.DB_NAME
});