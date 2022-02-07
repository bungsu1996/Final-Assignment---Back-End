import { Router } from "express";
import ParentController from "../controllers/parents.controller";

class ParentRoutes {
  public parentRoute: Router;
  constructor() {
    this.parentRoute = Router();
    this.parent();
    this.parentScoreStudent();
    this.parentForgotPassword();
  }
  protected parent = () => {
    this.parentRoute.get("/:id", ParentController.findParent);
    this.parentRoute.get("/student/:id", ParentController.findParentStudent);
  }
  protected parentScoreStudent = () => {
    this.parentRoute.get("/score-student/:id", ParentController.seeScoreStudentParent);
  };
  protected parentForgotPassword = () => {
    this.parentRoute.post("/forgot-password", ParentController.forgotPasswordParent);
    this.parentRoute.put("/change-password", ParentController.changePasswordParent);
  };
}

const parentRouter = new ParentRoutes().parentRoute;
export { parentRouter };
