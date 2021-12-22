import { Application } from 'express';
import app from './app';

class Server {
  public app: Application;
  constructor(){
    this.app = app;
  }
}

const server = new Server().app;
const port = process.env.PORT || 3000;
const host = "http://localhost"
const status = `Server Success Run At ${host}:${port}`;

server.listen(port, () => {
  console.log(`${status}`);
  
})