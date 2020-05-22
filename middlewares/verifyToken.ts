import { validateJwt } from "https://deno.land/x/djwt/validate.ts"

const key = "your-secret"

export const verifyJwtToken = async (context: any, next: any) => {
    console.log(context.request.headers);
    const token = await context.request.headers.get('token');
    if (!token) {
        context.response.body = {status: 'token not provided'};
        context.response.status = 400;
        return;
    }
    const isValidToken = await validateJwt(token, key, { isThrowing: false });
    if(!isValidToken) {
        context.response.body = {status: 'invalid token'};
        context.response.status = 400;
        return;
    }
    await next();
}