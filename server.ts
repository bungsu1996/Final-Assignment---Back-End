import { Application } from "express";
import app from "./app";

class Server {
  public app: Application;
  constructor() {
    this.app = app;
  }
}

const server = new Server().app;
const host = "http://localhost";
const port = process.env.PORT || 3535;
const status = `Server listening on ${host}:${port}`;

server.listen(port, () => {
  console.log(`${status}`);
});
