import { Router } from "express";
import homeroomController from "../controllers/homeroom.controller";

class HomeroomRoutes {
  public homeroomRoute: Router;
  constructor() {
    this.homeroomRoute = Router();
    this.homeroomControlScore();
  }
  protected homeroomControlScore = () => {
    this.homeroomRoute.get("/score/:homeroom", homeroomController.scoreByClassHomeroom);
  };
}

const homeroomRouter = new HomeroomRoutes().homeroomRoute;
export { homeroomRouter };
