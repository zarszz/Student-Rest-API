import { client } from "../../helpers/database.ts";

await client.connect();
await client.query(`
    CREATE SEQUENCE IF NOT EXISTS users_id_seq;
`)
await client.query(`
    CREATE TABLE users(
        id integer NOT NULL PRIMARY KEY DEFAULT nextval('table_name_id_seq'),
        email VARCHAR(30) NOT NULL,
        password VARCHAR(50) NOT NULL,
        role VARCHAR(10)
    )
`)

await client.end();