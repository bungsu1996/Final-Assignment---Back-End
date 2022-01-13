import { Router } from "express";
import schedules from "../controllers/schedule.controller";

class scheduleRoutes {
    scheduleRoutes: Router;
    constructor() {
        this.scheduleRoutes = Router();
        this.scheduleroutes();
    }
    scheduleroutes = () => {
        this.scheduleRoutes.get("/", schedules.listSchedule);
        this.scheduleRoutes.post("/create", schedules.createSchedule);
    };
}

export default new scheduleRoutes().scheduleRoutes;
