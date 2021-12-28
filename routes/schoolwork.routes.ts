import { Router } from "express";
import schoolworks from "../controllers/schoolwork.controller";

class schoolworkRoutes {
    schoolworkRoutes: Router;
    constructor() {
        this.schoolworkRoutes = Router();
        this.schoolworkroutes();
    }
    schoolworkroutes = () => {
        this.schoolworkRoutes.get("/", schoolworks.getList);
        this.schoolworkRoutes.post("/create", schoolworks.create);
    };
}

export default new schoolworkRoutes().schoolworkRoutes;
