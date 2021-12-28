import { Request, Response, Router } from "express";
import users from "../controllers/user.controller";
import courseRoutes from "./course.routes";
import scheduleRoutes from "./schedule.routes";
import schoolworkRoutes from "./schoolwork.routes";

class Routes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router.get("/", (req: Request, res: Response) => {
            res.status(200).json({ message: "Success!" });
        });

        this.router.post("/register", users.register);

        this.router.post("/login", users.login);

        this.router.use("/schoolwork", schoolworkRoutes);
        this.router.use("/course", courseRoutes);
        this.router.use("/schedule", scheduleRoutes);
    };
}

export default new Routes().router;
