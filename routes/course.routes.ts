import { Router } from "express";
import courses from "../controllers/course.controller";

class courseRoutes {
  courseRoutes: Router;
  constructor() {
    this.courseRoutes = Router();
    this.courseroutes();
  }
  courseroutes = () => {};
}

export default new courseRoutes().courseRoutes;
