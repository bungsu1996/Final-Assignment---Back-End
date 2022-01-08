import { Router } from "express";
import StudentController from "../controllers/students.controller";

class StudentRoutes {
    public studentRoute: Router;
    constructor() {
        this.studentRoute = Router();
        this.studentCRUD();
    }
    protected studentCRUD = () => {};
}

const studentRouter = new StudentRoutes().studentRoute;
export { studentRouter };
