import { client } from "../../helpers/database.ts";

await client.connect()
await client.query(`
    CREATE SEQUENCE IF NOT EXISTS table_name_id_seq;
`)
await client.query(`
    CREATE TABLE student(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('table_name_id_seq'),
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    student_id VARCHAR(13) NOT NULL UNIQUE,
    student_main_class VARCHAR(6) NOT NULL
    )
`);
await client.end();