import { Router } from "express";
import scoreController from "../controllers/score.controller";
import TeacherController from "../controllers/teacher.controller";

class TeacherRoutes {
    public teacherRoute: Router;
    constructor() {
        this.teacherRoute = Router();
        this.teacherControlScore();
    }
    protected teacherControlScore = () => {
        this.teacherRoute.post("/score/create", scoreController.createScore);
        this.teacherRoute.post(
            "/score/set-score",
            scoreController.createTestScore
        );
        this.teacherRoute.get(
            "/score/search-by/:academicYear/:semester/:classes",
            TeacherController.searchManageScore
        );
        this.teacherRoute.get(
            "/score/search/:id",
            TeacherController.getScoreSpecific
        );
        this.teacherRoute.put(
            "/score/update/:id",
            TeacherController.updateScore
        );
    };
}

const teacherRouter = new TeacherRoutes().teacherRoute;
export { teacherRouter };
