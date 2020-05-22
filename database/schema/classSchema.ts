import { client } from "../../helpers/database.ts";

await client.connect()
await client.query(`
    CREATE TABLE class(
        code VARCHAR(13) NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    )
`);
await client.end();