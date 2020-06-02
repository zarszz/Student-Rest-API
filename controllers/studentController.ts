import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import { client } from "../helpers/database.ts";
import { QueryResult } from "https://deno.land/x/postgres/query.ts";
import { parseResult } from "../helpers/parseQueryResult.ts";

export const rootRouter = async(context: any) => {
  context.response.body = "Hello World";
  context.response.status = 200;
  return;
}

export const getStudents = async (context: Context) => {
    await client.connect();
    const result: QueryResult = await client.query(`SELECT * FROM student`);
    if (result.rows.length <= 0) {
      context.response.body = { message: "student empty" };
      context.response.status = 302;
      return;
    }
    context.response.body = { data: parseResult(result) };
    context.response.status = 200;
    await client.end();
    return;
}

export const addStudent = async (context: Context) => {
    const reqBody = await context.request.body({
        contentTypes: {
          text: ["application/json"],
        },
      });
      const { name, age, studentId, studentMainClass } = reqBody.value;
      try {
        await client.connect();
        const isAvailable = await client.query(
          `
            SELECT * FROM student WHERE student_id=$1
          `,
          studentId
        );
        if (isAvailable.rows.length > 0) {
          context.response.body = {message: `student with id ${studentId} has registered on system. Please use other id`};
          context.response.status = Status.BadRequest;
          return;
        }
        const result = await client.query(
          `
              INSERT INTO student(name, age, student_id, student_main_class)
              VALUES($1, $2, $3, $4)
              RETURNING *
          `,
          name,
          age,
          studentId,
          studentMainClass
        );
        await client.end();
        context.response.body = { message: "success", data: parseResult(result) };
        context.response.status = 201;
        return;
      } catch (error) {
        context.response.body = { message: "an error occured", error: error };
        context.response.status = 500;
        return;
      }
}

export const updateStudent = async(context: any) => {
    const reqBody = await context.request.body({
        contentTypes: {
          text: ["application/json"],
        },
      });
      const { name, age, student_main_class } = reqBody.value;
      try {
        await client.connect();
        await client.query(
          `UPDATE student
           SET
           name=$1,
           age=$2,
           student_main_class=$3
           WHERE student_id=$4`,
          name,
          age,
          student_main_class,
          context.params.studentId
        );
        context.response.body = { message: "success" };
        context.response.status = 204;
        await client.end();
        return;
      } catch (error) {
        context.response.body = { message: "an error occured", error: error };
        context.response.status = 500;
        return;
      }
}

export const deleteStudent = async(context: any) => {
    try {
        await client.query(
          `
          DELETE FROM student WHERE studentid=$1;
        `,
          context.params.studentId
        );
        context.response.body = { message: "delete success" };
        context.response.status = 302;
        return;
      } catch (error) {
        context.response.body = { message: "an error occured", error: error };
        context.response.status = 500;
        return;
      }
}
