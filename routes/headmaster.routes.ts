import { Router } from "express";
import ClassConttroller from "../controllers/class.controller";

class headmasterRoutes {
  public headmasterRoute: Router;
  constructor() {
    this.headmasterRoute = Router();
    this.headmasterClasses();
  }
  protected headmasterClasses = () => {
    this.headmasterRoute.post('/class/create', ClassConttroller.createClass);
    this.headmasterRoute.get('/class/:idClass', ClassConttroller.scorebyClass);
    this.headmasterRoute.get('/class/year', ClassConttroller.classFilterByYear);
  }
}

const headmasterRouter = new headmasterRoutes().headmasterRoute;
export { headmasterRouter }