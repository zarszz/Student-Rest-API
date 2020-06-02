import { client } from "../../helpers/database.ts";

await client.connect();
await client.query(`
    CREATE SEQUENCE IF NOT EXISTS student_user_id_seq;
`)
await client.query(`
    CREATE TABLE student_users(
        id integer NOT NULL PRIMARY KEY DEFAULT nextval('student_user_id_seq'),
        user_id integer NOT NULL,
        student_id VARCHAR(13) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    )
`);
await client.end();