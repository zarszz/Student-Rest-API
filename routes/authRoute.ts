import { Router } from "https://deno.land/x/oak/mod.ts";
import { login} from "../controllers/authController.ts";

const authRouter = new Router();

authRouter
    .post('/login', login)

export default authRouter;
