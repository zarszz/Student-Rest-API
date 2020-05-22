import { Router } from "https://deno.land/x/oak/mod.ts";
import { getStudents, addStudent, updateStudent, deleteStudent, rootRouter } from "../controllers/studentController.ts";
import { verifyJwtToken } from "../middlewares/verifyToken.ts";

const studentRoute = new Router();

export default studentRoute
  .get("/students", verifyJwtToken, getStudents)
  .get("/", rootRouter)
  .post("/student", verifyJwtToken, addStudent)
  .delete("/student/:studentId", verifyJwtToken, deleteStudent)
  .put("/student/:studentId", verifyJwtToken, updateStudent);
