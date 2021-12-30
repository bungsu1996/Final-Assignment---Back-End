import { Router } from "express";
import ParentController from "../controllers/parents.controller";

class ParentRoutes {
    public parentRoute: Router;
    constructor() {
        this.parentRoute = Router();
        this.parentCRUD();
    }
    protected parentCRUD = () => {
        this.parentRoute.post("/create", ParentController.createParent);
        this.parentRoute.get("/", ParentController.findAllParent);
        this.parentRoute.get("/:id", ParentController.findParent);
        this.parentRoute.put("/update-parent", ParentController.updateParent);
        this.parentRoute.delete(
            "/delete-parent",
            ParentController.deleteParent
        );
    };
}

const parentRouter = new ParentRoutes().parentRoute;
export { parentRouter };
