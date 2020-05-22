import { Application } from "https://deno.land/x/oak/mod.ts";
import studentRoute from "./routes/studentsRoute.ts";
import authRouter from "./routes/authRoute.ts";

const app = new Application();
app.use(studentRoute.routes());
app.use(studentRoute.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
console.log('server listen at http://localhost:8080');
await app.listen({hostname: 'localhost', port: 8080});