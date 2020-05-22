import { client } from "../../helpers/database.ts";

await client.connect()
await client.query(`
    CREATE TABLE student_class(
        student_id int NOT NULL,
        class_code VARCHAR(13) NOT NULL,
        FOREIGN KEY (student_id) REFERENCES student(id),
        FOREIGN KEY (class_code) REFERENCES class(code)
    )
`);
await client.end();