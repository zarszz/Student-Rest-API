import { Router } from "https://deno.land/x/oak/mod.ts";
import { login, register } from "../controllers/authController.ts";

const authRouter = new Router();

authRouter
    .post('/login', login)
    .post('/register', register);

export default authRouter;
