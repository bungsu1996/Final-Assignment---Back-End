import express, { Application } from "express";
import connectDB from "./configs/connectDB";

class App {
  public app: Application;
  constructor(){
    this.app = express();
    this.plugin();
    this.route();
    this.errorHandler();
  }
  protected plugin = () => {
    connectDB.connect();
  }
  protected route = () => {

  }
  protected errorHandler = () => {

  }
}

const app = new App().app;
export default app;