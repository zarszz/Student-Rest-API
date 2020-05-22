import { client } from "../../helpers/database.ts";

await client.connect();
await client.query(`
    CREATE TABLE users(
        email VARCHAR(30) NOT NULL,
        password VARCHAR(50) NOT NULL
    )
`)

await client.end();