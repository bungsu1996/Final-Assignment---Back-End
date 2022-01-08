import { Router } from "express";
import ParentController from "../controllers/parents.controller";

class ParentRoutes {
    public parentRoute: Router;
    constructor() {
        this.parentRoute = Router();
        this.parentCRUD();
    }
    protected parentCRUD = () => {};
}

const parentRouter = new ParentRoutes().parentRoute;
export { parentRouter };
