import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import { client } from "../helpers/database.ts";
import { generateToken } from "../helpers/generateJwtToken.ts";
import { parseResult } from "../helpers/parseQueryResult.ts";

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
                *
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
        context.response.body = {message: "success", token: generateToken(parseResult(result))};
        context.response.status = Status.OK;
        await client.end();
        return;
    } catch (error) {
        context.response.body = {message: "an error occured", error: error};
        context.response.status = Status.InternalServerError;
        return;
    }
}

export const register = async (context: any) => {
    const requestBody = await context.request.body({
        contentTypes: {
            text: ["application/json"]
        }
    });
    const { email, password } = requestBody.value;
    try {
        await client.connect();
        const userIsRegistered = await client.query(
            `SELECT * FROM users WHERE email=$1`,
            email
        );
        // ensure if user is not registered yet on system
        if (userIsRegistered.rows.length > 0) {
            context.response.body = {message: `user with email ${email} already registered.`};
            context.response.status = Status.BadRequest;
            await client.end();
            return;
        };
        const result = await client.query(
            `
            INSERT INTO
                users(email, password, role)
            VALUES($1, $2, $3)
            `,
            email,
            password,
            'student'
        );
        context.response.body = {message: "registration success", data: result};
        context.response.status = Status.Created;
        await client.end();
        return;
    } catch (error) {
        context.response.body = {message: "an error occured", error: error};
        context.response.status = Status.InternalServerError;
    }
}