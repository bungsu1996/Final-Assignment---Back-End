import { Router } from "express";
import courses from "../controllers/course.controller";

class courseRoutes {
    courseRoutes: Router;
    constructor() {
        this.courseRoutes = Router();
        this.courseroutes();
    }
    courseroutes = () => {
        this.courseRoutes.get("/", courses.getList);
        this.courseRoutes.post("/create", courses.create);
    };
}

export default new courseRoutes().courseRoutes;
