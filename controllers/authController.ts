import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import { client } from "../helpers/database.ts";
import { generateToken } from "../helpers/generateJwtToken.ts";

export const login = async (context: Context) => {
    const requestBody = await context.request.body({
        contentTypes: {
            text: ["application/json"]
        }
    });
    const { email, password } = requestBody.value;
    try {
        await client.connect();
        const result = await client.query(
            `SELECT
                email, password
             FROM
                users
             WHERE email=$1 AND password=$2`,
             email,
             password
        );
        if(result.rows.length === 0) {
            context.response.body = {message: "invalid email or password"};
            context.response.status = Status.BadRequest;
            await client.end();
            return;
        }
        context.response.body = {message: "success", token: generateToken()};
        context.response.status = Status.OK;
        await client.end();
        return;
    } catch (error) {
        context.response.body = {message: "an error occured", error: error};
        context.response.status = Status.InternalServerError;
        return;
    }
}